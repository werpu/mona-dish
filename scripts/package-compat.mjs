/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import {execFileSync} from "node:child_process";
import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workRoot = fs.mkdtempSync(path.join(os.tmpdir(), "mona-dish-package-compat-"));
const packDir = path.join(workRoot, "pack");
const consumerDir = path.join(workRoot, "consumer");
const rootPackageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

function run(command, args, cwd) {
    execFileSync(command, args, {
        cwd,
        stdio: "inherit",
        env: {
            ...process.env,
            npm_config_audit: "false",
            npm_config_fund: "false",
            npm_config_ignore_scripts: "true"
        }
    });
}

function writeJson(fileName, value) {
    fs.writeFileSync(fileName, `${JSON.stringify(value, null, 2)}\n`);
}

function assertApi(api, label) {
    assert.equal(api.Lang.trim("  ok  "), "ok", `${label} Lang.trim failed`);
    assert.equal(api.Optional.fromNullable(null).isAbsent(), true, `${label} Optional failed`);
    assert.equal(JSON.stringify(api.simpleShallowMerge({a: 1}, {b: 2})), "{\"a\":1,\"b\":2}", `${label} merge failed`);
    assert.equal(typeof api.Stream.of, "function", `${label} Stream.of is missing`);
}

function assertCoreApi(api, label) {
    assertApi(api, label);
    assert.equal(api.Message, undefined, `${label} should not expose messaging`);
}

function assertMessagingApi(api, label) {
    assert.equal(typeof api.Message, "function", `${label} Message is missing`);
    assert.equal(typeof api.Broker, "function", `${label} Broker is missing`);
    assert.equal(typeof api.BroadcastChannelBroker, "function", `${label} BroadcastChannelBroker is missing`);
}

function createBrowserLikeContext(rxjs, extraGlobals = {}) {
    const sandbox = {
        console,
        rxjs,
        setTimeout,
        clearTimeout,
        ...extraGlobals
    };
    sandbox.globalThis = sandbox;
    sandbox.window = sandbox;
    return vm.createContext(sandbox);
}

function readInstalledBundle(relativePath) {
    return fs.readFileSync(path.join(consumerDir, "node_modules/mona-dish", relativePath), "utf8");
}

function smokeCorePackage() {
    const require = createRequire(path.join(consumerDir, "compat.cjs"));

    assertCoreApi(require("mona-dish"), "package main");
}

function smokeMessagingPackage() {
    const require = createRequire(path.join(consumerDir, "compat.cjs"));
    const rxjs = require("rxjs");

    assertMessagingApi(require("mona-dish/messaging"), "messaging subpath");
    assertApi(require("mona-dish/dist/js/commonjs/index.js"), "commonjs");
    assertApi(require("mona-dish/dist/js/umd/index.js"), "umd");

    let amdModule;
    const amdContext = createBrowserLikeContext(rxjs, {
        define(dependencies, factory) {
            assert.deepEqual([...dependencies], ["rxjs"], "amd dependencies changed");
            amdModule = factory(rxjs);
        }
    });
    amdContext.define.amd = true;
    vm.runInContext(readInstalledBundle("dist/js/amd/index.js"), amdContext, {filename: "mona-dish/dist/js/amd/index.js"});
    assertApi(amdModule, "amd");

    let amdRequireModule;
    const amdRequireContext = createBrowserLikeContext(rxjs, {
        require(dependencies, factory) {
            assert.deepEqual([...dependencies], ["rxjs"], "amd-require dependencies changed");
            amdRequireModule = factory(rxjs);
        }
    });
    vm.runInContext(readInstalledBundle("dist/js/amd-require/index.js"), amdRequireContext, {filename: "mona-dish/dist/js/amd-require/index.js"});
    assertApi(amdRequireModule, "amd-require");

    let systemModule;
    const systemContext = createBrowserLikeContext(rxjs, {
        System: {
            register(dependencies, declare) {
                assert.deepEqual([...dependencies], ["rxjs"], "system dependencies changed");
                const registration = declare((value) => {
                    systemModule = value;
                });
                registration.setters[0](rxjs);
                registration.execute();
            }
        }
    });
    vm.runInContext(readInstalledBundle("dist/js/system/index.js"), systemContext, {filename: "mona-dish/dist/js/system/index.js"});
    assertApi(systemModule, "system");

    const windowContext = createBrowserLikeContext(rxjs);
    vm.runInContext(readInstalledBundle("dist/js/window/index.js"), windowContext, {filename: "mona-dish/dist/js/window/index.js"});
    assertApi(windowContext.window, "window");
}

function smokeTypescriptConsumer(files, source) {
    fs.writeFileSync(path.join(consumerDir, "tsconfig.json"), `${JSON.stringify({
        compilerOptions: {
            strict: true,
            target: "ES2020",
            module: "Node16",
            moduleResolution: "Node16",
            skipLibCheck: false,
            noEmit: true
        },
        files
    }, null, 2)}\n`);
    fs.writeFileSync(path.join(consumerDir, files[0]), source.join("\n"));
    run(process.execPath, [path.join(root, "node_modules/typescript/bin/tsc"), "--noEmit"], consumerDir);
}

function smokeCoreTypescriptConsumer() {
    smokeTypescriptConsumer(["type-consumer.ts"], [
        "import {Lang, Optional, Stream, simpleShallowMerge} from \"mona-dish\";",
        "// @ts-expect-error Messaging is intentionally exposed via mona-dish/messaging.",
        "import {Message} from \"mona-dish\";",
        "",
        "const trimmed: string = Lang.trim(\"  ok  \");",
        "const absent: boolean = Optional.fromNullable(null).isAbsent();",
        "const merged = simpleShallowMerge({a: 1}, {b: 2});",
        "Stream.of(1, 2, 3);",
        "",
        "if (trimmed !== \"ok\" || !absent || merged.a !== 1 || merged.b !== 2) {",
        "    throw new Error(\"type consumer failed\");",
        "}",
        ""
    ]);
}

function smokeMessagingTypescriptConsumer() {
    smokeTypescriptConsumer(["messaging-consumer.ts"], [
        "import {Broker, Message} from \"mona-dish/messaging\";",
        "",
        "const msg = new Message({ok: true});",
        "const brokerCtor: typeof Broker = Broker;",
        "if (!msg || !brokerCtor) {",
        "    throw new Error(\"messaging type consumer failed\");",
        "}",
        ""
    ]);
}

fs.rmSync(workRoot, {recursive: true, force: true});
fs.mkdirSync(packDir, {recursive: true});
fs.mkdirSync(consumerDir, {recursive: true});

run("npm", ["pack", "--pack-destination", packDir], root);
const tarballs = fs.readdirSync(packDir).filter(fileName => fileName.endsWith(".tgz"));
assert.equal(tarballs.length, 1, "npm pack did not produce exactly one tarball");

writeJson(path.join(consumerDir, "package.json"), {
    name: "mona-dish-package-compat-consumer",
    version: "0.0.0",
    private: true,
    type: "commonjs"
});

run("npm", ["install", "--no-save", path.join(packDir, tarballs[0])], consumerDir);
smokeCorePackage();
smokeCoreTypescriptConsumer();

run("npm", [
    "install",
    "--no-save",
    path.join(packDir, tarballs[0]),
    `rxjs@${rootPackageJson.devDependencies.rxjs}`
], consumerDir);
smokeMessagingPackage();
smokeMessagingTypescriptConsumer();

console.log("Package compatibility tests passed");
