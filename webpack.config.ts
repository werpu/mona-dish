import * as webpack from 'webpack';
import * as path from 'path';

const CopyPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

let targetType = "";
let setupTargetType = function () {
    targetType = process.env.TARGET_TYPE;
}
setupTargetType();

const config: webpack.Configuration = {
    context: __dirname,
    entry: {
        Monad: "./src/main/typescript/Monad.ts",
        Lang: "./src/main/typescript/Lang.ts",
        DomQuery: "./src/main/typescript/DomQuery.ts",
        XmlQuery: "./src/main/typescript/XmlQuery.ts",
        Promise: "./src/main/typescript/Promise.ts",
        index: "./src/main/typescript/index.ts"
    },
    output: {
        filename: '[name].js',
        libraryTarget: targetType,
        globalObject: 'window',
        path: path.resolve(__dirname, './target/js/'+targetType+"/")
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    mode: "production",
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/}
        ]

    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[name].js.map"
        }),
        new FileManagerPlugin({
            onStart: {
                delete: [
                    path.resolve(__dirname,'./dist/js/'+targetType+"/"),
                    path.resolve(__dirname,'./dist/typescript'),
                    path.resolve(__dirname,'./dist/types')
                ]
            },
            onEnd: {
                copy: [
                    {source: path.resolve(__dirname,'./target/types/main/typescript'), destination: path.resolve(__dirname,'./dist/types')},
                    {source: path.resolve(__dirname,'./src/main/typescript'), destination: path.resolve(__dirname,'./dist/typescript')},
                    {source: path.resolve(__dirname,'./target/js'), destination: path.resolve(__dirname,'./dist/js')}
                ],
                delete: [
                    path.resolve(__dirname,'./target/js'),
                    path.resolve(__dirname,'./target/types')
                ]
            }
        })
    ]
}

export default config;
