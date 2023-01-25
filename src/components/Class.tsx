import React, { PureComponent } from "react";
// PureComponent 用于避免重复渲染（执行render函数），提高效率,
// shouldComponentUpdate会进行优化，对属性和状态进行浅比较，如果相等则不会重新渲染
function addAge(constructor: Function) {
  constructor.prototype.age = 111;
}

@addAge
class Class extends PureComponent {
  age?: number;
  render() {
    return <h2>我是类组件---{this.age}</h2>;
  }
}
export default Class;
