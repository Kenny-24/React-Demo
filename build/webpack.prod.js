// 借助node服务器serve
// 执行serve -s dist,就可以启动打包后的项目
// -D后，安装包会在package中的 devDependencies对象中。简称dev。dev是在开发环境中要用到的
// -S后，安装包会在package中的 dependencies 对象中。简称dep。dep是在生产环境中要用到的

const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 复制public下文件
          to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
          filter: (source) => {
            return !source.includes("index.html"); // 忽略index.html
            // html-webpack-plugin会以public下的index.html为模板生成一个index.html到dist文件下,所以不需要再复制该文件了
          },
        },
      ],
    }),
    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css", // 抽离css的输出目录和名称
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        // 压缩js，设置mode为production时,webpack会使用内置插件terser-webpack-plugin压缩js文件,
        // 该插件默认支持多线程压缩，但是上面配置optimization.minimizer压缩css后，js压缩就失效了，需要手动再添加一下
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"], // 删除console.log
          },
        },
      }),
    ],
  },
});
