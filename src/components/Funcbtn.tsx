import { useRef } from "react";
import React from "react";

export default function TextInputWithFocusButton() {
  const inputEl: any = useRef(0);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.value = "666666";
    inputEl.current.focus();

    console.log(666, inputEl.current);
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
