import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { render } from 'react-dom'
import Header from './Header'
import Content from './Content'
import './index.css'
import { Provider } from './Connect'
/**
 * redux其实并不复杂，他看起来匪夷所思的设定其实都是为了解决特定的问题而存在的
 * 前端中应用的状态存在的问题：一个状态可能被多个组件依赖或者影响，而React.js并没有提供好的解决方案，我们只能把状态提升到依赖或者影响这个状态的所有组件
 * 的公共父组件上，我们把这种行为叫做状态提升。但是需求不停变化，共享状态没完没了提升也不是个办法
 * 后来在context中提出，可以吧共享状态放到父组件的context上，这个父组件下所有的组件都可以从context中直接获取到状态而不需要一层层的传递了。但是直接从
 * context里面存放、获取数据增强了组件的耦合性；并且所有组件都可以修改context里边的状态就像谁都可以修改共享状态一样，导致程序运行的不可预料
 * 既然这样，我们可以尝试着把context和store组合起来，毕竟store的数据不是谁都能修改的，而是约定只能通过dispatch来进行修改，这样的话每个组件即可以去
 * context里边获取store从而获取状态，又不用担心他们乱改数据
 * 
 * 
 * 
 * 只会接受props并且渲染确定结果的组件我们把它叫做Dumb组件，这种组件只关心一件事情---根据props进行渲染
 * Smart组件专门做数据相关的应用逻辑，和各种数据打交道，和ajax打交道，然后把数据 通过props传递给Dumb组件。它们带领着Dumb组件完成了复杂的应用程序逻辑
 * Smart组件不需要考虑太多复用性的问题，它们就是用来执行特定应用逻辑的。Smart组件可能组合了Smart组件和Dumb组件。但是Dumb组件尽量不要依赖Smart组件。因为Dumb组件
 * 目的之一是为了复用。一个Dumb的 子组件应该都是Dumb才对
 */
function createStore(reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
  if (!state) return { themeColor: 'red' }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer)


class Index extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
)

