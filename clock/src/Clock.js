import React, { Component } from 'react'

class Clock extends Component {
    constructor () {
        super()
        this.state = {
            date: new Date()
        }
        console.log('初始化state')
    }
    componentWillMount () {
        console.log('组件将要挂载到页面上...')
        this.timer = setInterval(()=> {
            this.setState({ date: new Date() })
        },1000)
    }
    componentDidMount () {
        console.log('组件已经挂载到页面上...')
    }
    componentWillUnmount () {
        console.log('组件即将要从页面上被移除...')
        clearInterval(this.timer)
    }
    render () {
        return (
            <div>
                <h1>
                    <p>现在的时间是</p>
                    {this.state.date.toLocaleTimeString()}
                </h1>
            </div>
        )
    }
}

export default Clock