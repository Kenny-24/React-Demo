# React + TS + Webpack
# rxjs or mobx
## useState & useEffect
### useState函数接收一个参数作为初始值，useState返回值为一个数组，数组第一个元素是状态变量，第二个元素是设置该状态的方法，调用设置状态的方法，会同步触发diff和更新操作
### useEffect接收第一个参数是一个回调callback，会在特定时机执行，给useEffect传入的callback，可以返回一个方法clearEffect，React会在组件卸载时候调用clearEffect，清除副作用（比如停止定时器，解除事件绑定），useEffect第二个参数是一个数组，数组中是依赖项，当依赖变化时候才会执行useEffect传入的方法，如果是空数组，则只在组件初始挂载时候执行，类似componentDidMount，如果第二个参数不传，则在组件更新时候执行，类似componentDidMount和componentDidUpdate
## useMemo & useCallback