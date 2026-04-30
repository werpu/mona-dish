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
import path from "node:path";
import vm from "node:vm";
import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";
import * as rxjs from "rxjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const distFiles = [
    "dist/js/umd/index.js",
    "dist/js/commonjs/index.js",
    "dist/js/system/index.js",
    "dist/js/amd/index.js",
    "dist/js/amd-require/index.js",
    "dist/js/window/index.js",
    "dist/types/index.d.ts",
    "dist/typescript/index.ts"
];

function assertDistFile(relativePath) {
    const absolutePath = path.join(root, relativePath);
    assert.ok(fs.existsSync(absolutePath), `${relativePath} is missing`);
    assert.ok(fs.statSync(absolutePath).size > 0, `${relativePath} is empty`);
}

function assertApi(api, label) {
    assert.equal(typeof api, "object", `${label} did not expose an object`);
    assert.equal(api.Lang.trim("  ok  "), "ok", `${label} Lang.trim failed`);
    assert.equal(api.Lang.equalsIgnoreCase("Alpha", "alpha"), true, `${label} Lang.equalsIgnoreCase failed`);
    assert.equal(api.Optional.fromNullable(null).isAbsent(), true, `${label} Optional failed`);
    assert.equal(JSON.stringify(api.simpleShallowMerge({a: 1}, {b: 2})), "{\"a\":1,\"b\":2}", `${label} merge failed`);
    assert.equal(typeof api.Stream.of, "function", `${label} Stream.of is missing`);
}

function readBundle(relativePath) {
    return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function createBrowserLikeContext(extraGlobals = {}) {
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

function smokePackageMain() {
    assertApi(require(root), "package main");
}

function smokeCommonJs() {
    assertApi(require(path.join(root, "dist/js/commonjs/index.js")), "commonjs");
}

function smokeUmd() {
    assertApi(require(path.join(root, "dist/js/umd/index.js")), "umd");
}

function smokeAmd() {
    let exportedModule;
    const context = createBrowserLikeContext({
        define(dependencies, factory) {
            assert.deepEqual([...dependencies], ["rxjs"], "amd dependencies changed");
            exportedModule = factory(rxjs);
        }
    });
    context.define.amd = true;
    vm.runInContext(readBundle("dist/js/amd/index.js"), context, {filename: "dist/js/amd/index.js"});
    assertApi(exportedModule, "amd");
}

function smokeAmdRequire() {
    let exportedModule;
    const context = createBrowserLikeContext({
        require(dependencies, factory) {
            assert.deepEqual([...dependencies], ["rxjs"], "amd-require dependencies changed");
            exportedModule = factory(rxjs);
        }
    });
    vm.runInContext(readBundle("dist/js/amd-require/index.js"), context, {filename: "dist/js/amd-require/index.js"});
    assertApi(exportedModule, "amd-require");
}

function smokeSystem() {
    let exportedModule;
    const context = createBrowserLikeContext({
        System: {
            register(dependencies, declare) {
                assert.deepEqual([...dependencies], ["rxjs"], "system dependencies changed");
                const registration = declare((value) => {
                    exportedModule = value;
                });
                registration.setters[0](rxjs);
                registration.execute();
            }
        }
    });
    vm.runInContext(readBundle("dist/js/system/index.js"), context, {filename: "dist/js/system/index.js"});
    assertApi(exportedModule, "system");
}

function smokeWindow() {
    const context = createBrowserLikeContext();
    vm.runInContext(readBundle("dist/js/window/index.js"), context, {filename: "dist/js/window/index.js"});
    assertApi(context.window, "window");
}

distFiles.forEach(assertDistFile);
smokePackageMain();
smokeCommonJs();
smokeUmd();
smokeAmd();
smokeAmdRequire();
smokeSystem();
smokeWindow();

console.log("Dist smoke tests passed");
