// webpack.base.js
// module 是 webpack 资源处理的基本单位
// webpack 生成module 一个入口文件及其依赖结合成一个对应的chunk 其中动态引入文件生产一个对应的chunk
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development"; // 是否是开发模式

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  output: {
    filename: "static/js/[name].[chunkhash:8].js", // 每个输出js的名称，加上[chunkhash:8]
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  cache: {
    type: "filesystem", // 使用文件缓存 来缓存生成的module、chunk
  },
  module: {
    // rules数组倒序遍历
    rules: [
      {
        test: /.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /.less$/, //匹配所有的 less 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      // {
      //   test: /.(css|less)$/, // 匹配 css 文件
      //   // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
      //   // css-loader: 解析css文件代码
      //   // loader从右往左执行
      //   // postcss-loader就是来给css3加浏览器前缀，兼容低版本浏览器
      //   use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      // },
      {
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的ts,tsx进行loader解析，exclude为不去解析的（优先级高）
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: ["thread-loader", "babel-loader"], // thread-loader开启多线程loader，开启多线程也是需要启动时间,大约600ms左右，所以适合规模比较大的项目
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
          filename: "static/images/[name].[contenthash:8][ext]", // 文件输出目录和命名，加上[contenthash:8]
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 文件输出目录和命名，加上[contenthash:8]
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 文件输出目录和命名，加上[contenthash:8]
        },
      },
    ],
  },
  resolve: {
    // 打包时自动补引入文件后缀，可以提升构建速度
    extensions: [".js", ".tsx", ".ts"],
    alias: {
      "@": path.join(__dirname, "../src"), // 减少路径复杂度
    },
    modules: [path.resolve(__dirname, "../node_modules")], // 查找第三方模块只在本项目的node_modules中查找
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
