var path = require('path');

// 常用路径
var ROOT = path.resolve(__dirname);
var SRC = path.resolve(ROOT, '../src/');
var DIST = path.resolve(ROOT, '../dist/');
var MODULES = path.resolve(ROOT, '../node_modules/');

// 入口 
var ENTRY = path.resolve(SRC, './entry');

// 端口
var PORT = 2333;

module.exports = {
    ROOT,
    SRC,
    DIST,
    MODULES,
    PORT,
    ENTRY
};