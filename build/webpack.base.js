// webpack.base.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        test: /.(css|less)$/, // 匹配 css 文件
        // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
        // css-loader: 解析css文件代码
        // loader从右往左执行
        // postcss-loader就是来给css3加浏览器前缀，兼容低版本浏览器
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: "babel-loader",
      },
      //处理图片文件
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
            // 减少一个图片的 HTTP 请求，CSS 文件体积的增大，CSS 会阻塞渲染，而图片不会，有利有弊
          },
        },
        generator: {
          filename: "static/images/[name][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    // 打包时自动补引入文件后缀，可以提升构建速度
    extensions: [".js", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
  ],
};

// 例子
// console.log('NODE_ENV', process.env.NODE_ENV) production
// console.log('BASE_ENV', process.env.BASE_ENV) development
// 当前是打包模式,业务环境是开发环境
