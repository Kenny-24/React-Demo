// any component
import { observer } from "mobx-react-lite";
import store from "@/store/testStore";
import React from "react";

const Welcome = () => {
  const {
    data: { name },
    number,
  } = store;
  return (
    <p>
      hello {name} and Number: {number}
    </p>
  );
};

export default observer(Welcome); // observer返回一个响应式组件
