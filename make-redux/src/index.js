const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red'
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function stateChanger(state, action) {
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

function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action) //覆盖原对象
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

const store = createStore(appState, stateChanger)
let oldAppState = store.getState() //缓存旧的state
store.subscribe(() => {
  const newState = store.getState() //数据可能变化，获取最新的state
  renderApp(newState, oldAppState) //把新旧的state传进去渲染
  oldAppState = newState //渲染完毕以后,把新的state变成了旧的state,等待下一次数据变化重新渲染页面
})

renderApp(store.getState())

store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'React.js 小书' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
