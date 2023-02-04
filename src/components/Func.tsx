import { useRef } from "react";
import React from "react";
import store from "@/store/testStore";

export default function TextInputWithFocusButton() {
  const inputEl: any = useRef(0);
  const { changeName, increase, decrease } = store;
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.value = "666666";
    inputEl.current.focus();

    console.log(666, inputEl.current);
  };
  return (
    <>
      <div>
        Store:
        <button
          onClick={() => {
            increase();
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            decrease();
          }}
        >
          -
        </button>
        <input onChange={({ target: { value } }) => changeName(value)}></input>
      </div>
      <div>
        useRef:
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </div>
    </>
  );
}
