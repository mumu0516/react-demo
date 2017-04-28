import React, { Component } from 'react'
import Clock from './Clock'
import Card from './Card'
import DanHTML from './DanHTML'

class Main extends Component {
    constructor () {
        super()
        this.state = {
            showClock: true
        }
        console.log('初始化state')
    }
    handleShow () {
        this.setState({
            showClock: !this.state.showClock
        })
    }
    componentWillMount () {
        console.log('组件将要挂载到页面上...')
    }
    componentDidMount () {
        this.input.focus()
        console.log('组件已经挂载到页面上')
    }
    shouldComponentUpdate (nextProps, nextState) {
        console.log('是否更新组件... false则不会重新渲染')
        console.log(this.state)
        console.log(nextState)
        return nextState !== this.state
    }
    componentWillReceiveProps (nextProps) {
        console.log('组件从父组件接收到新的props之前调用')
    }
    componentWillUpdate () {
        console.log('组件开始重新渲染之前调用')
    }
    componentDidUpdate () {
        console.log('组件重新渲染并且把更改变更到真实的DOM以后调用')
    }
    render () {
        return (
            <div>
                <button onClick={this.handleShow.bind(this)}>
                    显示或者隐藏时钟
                </button>
                <br />
                <input type="text" ref={(input) => this.input = input}/>
                {this.state.showClock ? <Clock /> : null }
                <Card>
                    <h1>React-demo</h1>
                    <p>发现React写法还是很好玩的</p>
                </Card>
                <DanHTML />
            </div>
        )
    }
}

export default Main