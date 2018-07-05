
import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
/**
 * 创建一个初始化的state
 */
const initState = {
    card: {
        name: 'Jack Ma',
        avator: 'a.jpg'
    },
    dialog: {
        states: false
    }
}
/**
 * 创建一个 store 仓库
 */

const store = createStore(reducer, initState)

export default store