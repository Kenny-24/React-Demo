module.exports = {
  // 先执行完所有Plugin，再执行Preset
  // Plugin，按照声明次序顺序执行，为其中一个点做降级编译比如说箭头函数
  // Preset，执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  presets: [
    [
      "@babel/preset-env",
      {
        // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
        // "targets": {
        //  "chrome": 35,
        //  "ie": 9
        // },
        useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // 配置使用core-js使用的版本
      },
    ],
    // webpack默认只能识别js文件，不能识别jsx语法，将ts/tsx装成js/jsx，再将jsx转成js
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};
