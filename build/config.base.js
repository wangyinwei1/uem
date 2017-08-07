var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入常量
var CONST = require('./constants');
module.exports = {
    entry: {
        polyfills: ['babel-polyfill', 'event-source-polyfill'],
        vendor: [
            'react', 
            'react-dom',
            'jquery',
            'lodash',
            'moment',
            'immutable'
        ],
        i18n: [
            CONST.i18n,
            CONST.locale
        ],
        main: CONST.ENTRY,
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
            moment: 'moment',
            cls: 'classnames',
            Immutable: 'immutable'
        }),
        new HtmlWebpackPlugin({
            title: 'UEM',
            filename: 'index.html',
            template: path.resolve(CONST.SRC, './assets/templates/index.html'),
            favicon: path.resolve(CONST.SRC, './assets/images/favicon.png'),
            minify: {
                // removeComments: true,
                // collapseWhitespace: true
            },
            hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // webpack 是从右到左读取
            name: ['i18n', 'vendor', 'polyfills']
        })
    ],
    output: {
        filename: 'js/[name].bundle.js',
        // filename: '[name].bundle.[chunkhash:5].js',
        path: CONST.DIST
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: [CONST.MODULES, path.resolve(CONST.SRC, './assets')],
            use: ['babel-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            // use: ['file-loader']
            exclude: [CONST.MODULES],
            use: {
                loader: 'url-loader',
                options: {
                    limit: '8192',
                    name: 'img/[name].[ext]'
                }
            }
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: '8192',
                    name: 'font/[name].[ext]'
                }
            }
        }, {
            test: /\.(csv|tsv)$/,
            use: ['csv-loader']
        }, {
            test: /\.xml$/,
            use: ['xml-loader']
        }]
    }
};