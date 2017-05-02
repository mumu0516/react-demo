// const appState = {
//   title: {
//     text: 'React.js 小书',
//     color: 'red'
//   },
//   content: {
//     text: 'React.js 小书内容',
//     color: 'blue'
//   }
// }

/**
 * 
 * 
 * @param {any} state 
 * @param {any} action 
 * @returns 
 * 从这个例子我们可以看出来 共享的状态如果可以被任意修改的话，那么程序的行为将非常不可预料，所以提高了修改数据的门槛:必须通过dispatch执行某些允许的修改
 * 操作，而且必须在action里边声明，这种模式比较好用，所以我们就抽象出来一个createStore，它可以产生store 里边包含getState方法和dispatch函数
 * 后来发现每次修改数据都需要手动重新渲染非常麻烦，我们希望自动重新渲染视图，每次数据更新的时候自动重新渲染视图 ，但是原来的“重新渲染视图”有比较严重的性能
 * 问题，所以引入了“共享结构的对象”来帮助我们解决问题，这样就可以在每个渲染函数的开头进行简单的判断避免没有被修改过的数据重新渲染
 * 我们后来修改了stateChanger为reducer，定义了reducer只能是纯函数，功能就是负责初始化state和根据state和action计算具有共享结构的新的state
 * 纯函数:1.函数的返回结果只依赖于它的参数。2.函数执行过程里边没有副作用（不影响外界变量）
 * createStore现在就可以拿来直接使用，套路就是:
 * 定义一个reducer
 * function reducer (state, action) {
 * 初始化state 和 switch case
 * }
 * 生产store
 * const store = createStore(reducer)
 * 监听数据变化重新渲染页面
 * store.subscribe(() => renderApp(store.getState()))
 * 首次渲染页面
 * renderApp(store.getState())
 * 后边就可以随意的dispatch触发更新页面,页面自动更新
 * store.dispatch(...)
 */
function stateChanger(state, action) {
  if (!state) {
    return {
      title: {
        text: 'React.js 小书',
        color: 'red'
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      // state.title.text = action.text
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      // state.title.color = action.color
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

function renderApp(appState, oldAppState = {}) {
  if (appState === oldAppState) return
  console.log('app render...')
  renderTitle(appState.title, oldAppState.title)
  renderContent(appState.content, oldAppState.content)
}

function renderTitle(title, oldTitle = {}) {
  if (title === oldTitle) return //数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent(content, oldContent = {}) {
  if (content === oldContent) return //数据没有变化就不渲染了
  console.log('content render...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

function createStore(reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action) //覆盖原对象
    listeners.forEach((listener) => listener())
  }
  dispatch({}) //初始化state
  return { getState, dispatch, subscribe }
}

const store = createStore(stateChanger)
let oldAppState = store.getState() //缓存旧的state
store.subscribe(() => {
  const newState = store.getState() //数据可能变化，获取最新的state
  renderApp(newState, oldAppState) //把新旧的state传进去渲染
  oldAppState = newState //渲染完毕以后,把新的state变成了旧的state,等待下一次数据变化重新渲染页面
})

renderApp(store.getState())

store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'React.js 小书' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
