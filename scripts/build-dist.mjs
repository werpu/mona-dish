import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const paths = {
    distJs: path.join(root, "dist/js"),
    distTypes: path.join(root, "dist/types"),
    distSources: path.join(root, "dist/typescript"),
    targetTypes: path.join(root, "target/types"),
    generatedTypes: path.join(root, "target/types/main/typescript"),
    sourceTypescript: path.join(root, "src/main/typescript")
};

async function remove(target) {
    await fs.rm(target, {recursive: true, force: true});
}

async function copy(source, destination) {
    await remove(destination);
    await fs.mkdir(path.dirname(destination), {recursive: true});
    await fs.cp(source, destination, {recursive: true});
}

async function clean() {
    await Promise.all([
        remove(paths.distJs),
        remove(paths.distTypes),
        remove(paths.distSources),
        remove(paths.targetTypes)
    ]);
}

async function copyDist() {
    await copy(paths.generatedTypes, paths.distTypes);
    await copy(paths.sourceTypescript, paths.distSources);
    await remove(paths.targetTypes);
}

const command = process.argv[2];

if (command === "clean") {
    await clean();
} else if (command === "copy") {
    await copyDist();
} else {
    throw new Error(`Unknown build-dist command: ${command ?? ""}`);
}
