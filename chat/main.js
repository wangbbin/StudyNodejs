//var hello = require('hello') // 自定义模块形式的 直接到module.paths路径查找文件或包
//var hello = require('hello.js'); //指定了扩展名后只会查扩展名对应的文件 不会查包
//var hello = require('./hello') //路径形式只会找路径下的文件或包 , 自动加扩展名（根据require..extensions）
var hello = require('./hello.js')
console.log(require.extensions)
console.log(module.paths)
hello();