// store
// 可以创建多个store，使用时引入对应store即可
import { makeAutoObservable } from 'mobx'

interface StoreDataProps {
    name: string;
}

const testStore = makeAutoObservable({
    data: {
        name: 'default name'
    } as StoreDataProps,
    number:0,
    changeName: (val:string) => (testStore.data.name=val),// action
    increase:()=>{testStore.number++},
    decrease:()=>{testStore.number--}
})

export default testStore
