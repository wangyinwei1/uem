
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('./config.base');

// 引入常量
var CONST = require('./constants');

module.exports = webpackMerge(config, {
    // devtool: 'source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader'],
                publicPath: '../'
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.scss$/,
            include: [path.resolve(CONST.SRC, './components/')],
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[local]_[hash:base64:5]'
                    }
                }, 'sass-loader']
            })
        }, {
            test: /\.scss$/,
            exclude: [path.resolve(CONST.SRC, './components/')],
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: true,
            drop_debugger: true
        })
    ]
});
