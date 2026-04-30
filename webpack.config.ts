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
import * as webpack from "webpack";
import * as path from "node:path";

const TerserPlugin = require("terser-webpack-plugin");
const LicenseWebpackPlugin = require("license-webpack-plugin").LicenseWebpackPlugin;

export default (env: any = {}) => {
    const targetTypes = (env.TARGET_TYPES ?? env.TARGET_TYPE ?? "umd")
        .split(",")
        .map((targetType: string) => targetType.replace(/\s+/gi, ""))
        .filter((targetType: string) => !!targetType);

    const createConfig = (targetType: string): webpack.Configuration => ({
        context: __dirname,
        entry: {
            Monad: "./src/main/typescript/Monad.ts",
            Lang: "./src/main/typescript/Lang.ts",
            DomQuery: "./src/main/typescript/DomQuery.ts",
            XmlQuery: "./src/main/typescript/XmlQuery.ts",
            Promise: "./src/main/typescript/Promise.ts",
            Stream: "./src/main/typescript/Stream.ts",
            Es2019Array: "./src/main/typescript/Es2019Array.ts",
            TagBuilder: "./src/main/typescript/TagBuilder.ts",
            Messaging: "./src/main/typescript/Messaging.ts",
            PromiseShim: "./src/main/typescript/PromiseShim.ts",
            index: "./src/main/typescript/index.ts",
            index_core: "./src/main/typescript/index_core.ts"
        },
        output: {
            filename: "[name].js",
            libraryTarget: targetType,
            globalObject: "this",
            chunkFormat: "commonjs",
            path: path.resolve(__dirname, "./dist/js/" + targetType + "/"),
            clean: true
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".json"]
        },
        mode: "production",
        target: "es5",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            ignoreDiagnostics: [5011]
                        }
                    }],
                    exclude: /node_modules/
                }
            ]
        },
        optimization: {
            minimizer: [new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: (astNode: any, comment: any) => comment.value.startsWith("! licenses are at ")
                    }
                }
            })],
        },
        externals: {
            "rxjs": "rxjs",
            "crypto-js": "crypto-js"
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: "[name].js.map"
            }),
            new LicenseWebpackPlugin({
                addBanner: true,
                renderBanner: () => `
                    /*! Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */`,
                outputFilename: "licenses.json",
                unacceptableLicenseTest: (licenseIdentifier: string) => ["GPL", "AGPL", "LGPL", "NGPL"].includes(licenseIdentifier),
                stats: {
                    warnings: true,
                    errors: true
                }
            })
        ]
    });

    return targetTypes.map(createConfig);
};
