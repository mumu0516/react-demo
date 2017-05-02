import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types'
// import App from './App';
import './index.css';

// 构造函数里面的内容其实就很好理解，就是往 state 里面初始化一个 themeColor 状态。
// getChildContext 这个方法就是设置 context 的过程，它返回的对象就是 context（也就是上图中处于中间的方块）
// 所有的子组件都可以访问到这个对象。我们用 this.state.themeColor 来设置了 context 里面的 themeColor。
// 还有一个看起来很可怕的 childContextTypes，它的作用其实 propsType 验证组件 props 参数的作用类似。
// 不过它是验证 getChildContext 返回的对象。为什么要验证 context，因为 context 是一个危险的特性，
// 按照 React.js 团队的想法就是，把危险的事情搞复杂一些，提高使用门槛人们就不会去用了。
// 如果你要给组件设置 context，那么 childContextTypes 是必写的。
class Index extends Component {
  static childContextTypes = {
    themeColor: PropTypes.string
  }
  constructor () {
    super()
    this.state = { themeColor: 'red'}
  }
  getChildContext () {
    return { themeColor: this.state.themeColor }
  }
  componentDidMount () {
    this.setState({ themeColor: 'green' })
  }
  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <h2>这里是头部</h2>
        <Title />
      </div>
    )
  }
}

class Main extends Component {
  render () {
    return (
      <div>
        <h2>这里是主要内容</h2>
        <Content/>
      </div>
    )
  }
}

class Title extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }
  render () {
    return (
      <h1 style={{ color: this.context.themeColor }}>React.js 小书标题</h1>
    )
  }
}

class Content extends Component {
  render () {
    return (
      <div>
        <h2>React.js 小书内容</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
