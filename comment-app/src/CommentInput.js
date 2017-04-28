import React, { Component } from 'react'
import PropTypes from 'prop-types'


/**
 * 
 * 
 * @class CommentInput
 * @extends {Component}
 * 组件内容编写顺序如下
 * 1.constructor
 * 2.staitc开头的静态属性
 * 3.组件的生命周期
 * 4.事件监听方法, handle*
 * 5.组件私有方法, mr*
 * 6.render 渲染函数
 */
class CommentInput extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            content: ''
        }
    }
    static PropTypes = {
        onSubmit: PropTypes.func
    }
    componentWillMount () {
        // 当组件挂载到页面上之后开始加载用户名
        this.mrLoadUsername()
    }
    componentDidMount () {
        this.textarea.focus()
    }
    // PS: 个人习惯 组件的私有方法都以'mr'开头, 所有的事件监听方法都用'handle'开头
    handleUsernameChange (event) {
        this.setState({
            username: event.target.value
        })
    }
    handleContentChange (event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit () {
        if (this.props.onSubmit) {
            const { username, content } = this.state
            this.props.onSubmit({username, content, createdTime: +new Date()})
        }
        this.setState({ content: ''})
    }
    handleUsernameBlur (event) {
        this.mrSaveUsername(event.target.value)
    }
    mrSaveUsername (username) {
        localStorage.setItem('username', username)
    }
    mrLoadUsername () {
        const username = localStorage.getItem('username')
        // 如果用户名存在于本地存储中,则设置到state中
        if (username) {
            this.setState({ username })
        }
    }
    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名:</span>
                    <div className='comment-field-input'>
                        <input type="text" 
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                            onBlur={this.handleUsernameBlur.bind(this)}/>
                    </div>
                </div> 
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容:</span>
                    <div className='comment-field-input'>
                        <textarea 
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}
                            ref={(textarea) => this.textarea = textarea}></textarea>
                    </div>
                </div> 
                <div className='comment-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

export default CommentInput 