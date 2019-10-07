import webpack from 'webpack';
import * as path from 'path';


const config: webpack.Configuration = {
    context: __dirname,
    entry: {
        Monad: "./src/main/typescript/Monad.ts",
        Lang: "./src/main/typescript/Lang.ts",
        DomQuery: "./src/main/typescript/DomQuery.ts"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'./target')
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    mode: "development",
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }
        ]
    }
}

export default config;
