import React, { lazy, Suspense, useState } from "react";
import Class from "@/components/Class";
import "@/app.css";
import "@/app.less";
import smallImg from "@/assets/imgs/2k.png";
import bigImg from "@/assets/imgs/60k.png";
import Input from "@/components/Input";

// prefetch
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /*webpackPrefetch: true*/
      "@/components/PreFetchDemo"
    )
);
// preload
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /*webpackPreload: true*/
      "@/components/PreloadDemo"
    )
);

function App() {
  // return (
  //   // Class组件
  //   // <div>
  //   //   <h2>webpack5-react-ts</h2>
  //   //   <Class></Class>
  //   //   <img src={smallImg} alt="小于10kb的图片" />
  //   //   <img src={bigImg} alt="大于于10kb的图片" />
  //   //   <div className="smallImg"></div> {/* 小图片背景容器 */}
  //   //   <div className="bigImg"></div> {/*大图片背景容器*/}
  //   // </div>
  //   // Input组件
  //   <div>
  //     <Input></Input>
  //   </div>
  // );
  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow(true);
  };
  return (
    <>
      <h2 onClick={onClick}>展示</h2>
      {/* show为true时加载组件 */}
      {show && (
        <>
          <Suspense fallback={null}>
            <PreloadDemo />
          </Suspense>
          <Suspense fallback={null}>
            <PreFetchDemo />
          </Suspense>
        </>
      )}
    </>
  );
}
export default App;
