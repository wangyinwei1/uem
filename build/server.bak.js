var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require("webpack");
var webpackConfig = require("./config.dev");
var CONST = require('./constants');

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    host: "0.0.0.0",
    hot: true,
    historyApiFallback: true,
    // compress: true, // 貌似没用，文件大小并不会减小
    // 参考：https://doc.webpack-china.org/configuration/stats/
    stats: {
        version: false,
        hash: false,
        chunks: false,
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));

app.listen(CONST.PORT, function (error) {
    if (error) {
        return console.error(error);
    }
    console.log("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", CONST.PORT, CONST.PORT);
});
