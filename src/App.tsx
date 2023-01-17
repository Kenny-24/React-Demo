import React from "react";
import Class from "./components/Class";
import "./app.css";
import "./app.less";
import smallImg from "./assets/imgs/2k.png";
import bigImg from "./assets/imgs/60k.png";

function App() {
  return (
    <div>
      <h2>webpack5-react-ts</h2>
      <Class></Class>
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />
      <div className="smallImg"></div> {/* 小图片背景容器 */}
      <div className="bigImg"></div> {/* 大图片背景容器 */}
    </div>
  );
}
export default App;
