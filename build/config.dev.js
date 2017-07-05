var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var config = require('./config.base');

// 引入常量
var CONST = require('./constants');

module.exports = webpackMerge(config, {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: [
            CONST.ENTRY
        ]
    },
    output: {
        path: '/'
        // publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.scss$/,
            include: [path.resolve(CONST.SRC, './components/')],
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]_[hash:base64:5]'
                }
            }, 'sass-loader']
        }, {
            test: /\.scss$/,
            exclude: [path.resolve(CONST.SRC, './components/')],
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:' + CONST.PORT
        })
    ],
    devServer: {
        host: "0.0.0.0",
        historyApiFallback: true,
        port: CONST.PORT,
        // compress: true, // 貌似没用，文件大小并不会减小
        // 参考：https://doc.webpack-china.org/configuration/stats/
        stats: {
            version: false,
            hash: false,
            chunks: false,
            colors: true
        },
        proxy: {
            '/uem/api/v1/': {
                // target: 'http://10.1.241.23:7600', // r9
                target: "http://10.1.51.238:7600", // r10
                pathRewrite: { '^\/uem\/api': '' }
            }
        }
    }
});
