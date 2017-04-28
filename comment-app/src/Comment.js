import React, {  Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
    constructor () {
        super()
        this.state = { timeString: '' }
    }
    // propTypes 指定从父组件传递过来的值的类型，如果类型不对，则报错
    // PropTypes.
    // array 数组
    // bool 布尔值
    // func 函数
    // number 数字
    // object 对象
    // string 字符串
    // symbol
    // node 其中一个（numbers,strings,elements,array）
    // element 一个react组件
    // instanceOf(Message) 
    // oneOf([])其中的某一个
    // arrayOf()
    // objectOf(PropTypes.number) 属性的值是某种类型
    // shape({
    //     color:PropTypes.string,
    //     fontSize:PropTypes.number
    // })
    // isRequired 必须的
    // any 什么类型都可以
    static propTypes = {
        comment:PropTypes.object.isRequired
    }
    componentWillMount () {
        this.mrUpdateString()
    }
    handleDeleteComment () {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }
    mrUpdateString () {
        const comment = this.props.comment
        const duration = (+Date.now() - comment.createdTime) / 1000
        this.setState({
            timeString: duration > 60 
            ? `${Math.round(duration / 60)}分钟前`
            : `${Math.round(Math.max(duration, 1))}秒前`
        })
    }
    render () {
        const { comment } = this.props
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username}</span>：
                </div>
                <p>{this.props.comment.content}</p>
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span 
                    className='commit-delete'
                    onClick={this.handleDeleteComment.bind(this)}>
                    删除
                </span>
            </div>
        )
    }
}

export default Comment