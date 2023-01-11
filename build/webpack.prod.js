// 借助node服务器serve
// 执行serve -s dist,就可以启动打包后的项目
// -D后，安装包会在package中的 devDependencies对象中。简称dev。dev是在开发环境中要用到的
// -S后，安装包会在package中的 dependencies 对象中。简称dep。dep是在生产环境中要用到的

const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
module.exports = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
});
