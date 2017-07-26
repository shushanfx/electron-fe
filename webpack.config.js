var path = require('path');
var webpack = require('webpack');
var fs = require("fs")

var CopyWebpackPlugin = require('copy-webpack-plugin');
var APP_PATH = path.resolve(__dirname, 'app');
var SRC_PATH = path.resolve(__dirname, 'src');

var map = {};
var list = fs.readdirSync(path.resolve(SRC_PATH, "entry"));
for(item of list){
    let key = item;
    let index = item.lastIndexOf(".");
    if(index != -1){
        key = key.substring(0, index);
    }
    map[key] = path.resolve(SRC_PATH, "entry", item);
}

module.exports = {
    cache: true,
    target: 'electron',
    devtool: 'source-map',
    entry: map,
    output: {
        path: path.resolve(APP_PATH, "entry"),
        filename: '[name].js',
        chunkFilename: '[chunkhash].js',
        sourceMapFilename: '[name].map'
    },
    module: {
        loaders: [
            {
                test: /\.js|\.jsx?$/,
                loader: 'babel-loader',
                include: [SRC_PATH],
                query: {
                    presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react'],
                    plugins: ["transform-decorators-legacy"]
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
        new CopyWebpackPlugin([
            { from: path.resolve(SRC_PATH, 'main.js'), to: '../main.js' },
            { from: path.resolve(SRC_PATH, 'page'), to: '../page' },
            { from: path.resolve(SRC_PATH, 'res'), to: '../res' },
            { from: path.resolve(SRC_PATH, 'package.json'), to: '../package.json' }
        ])
    ]
};