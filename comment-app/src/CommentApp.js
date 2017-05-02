import React , { Component } from 'react'
import { PropTypes } from 'prop-types'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import wrapWithLoadData from './wrapWithLoadData'


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
class CommentApp extends Component {
    // constructor () {
    //     super()
    //     this.state = {
    //         comments: []
    //     }
    //     console.log('state初始化完成')
    // }
    constructor (props) {
        super(props)
        this.state = {
            comments: props.data
        }
    }
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }
    // componentWillMount () {
    //     this.mrLoadComments()
    //     console.log('组件即将挂载到页面上...')
    // }
    // componentDidMount () {
    //     console.log('组件已经挂载到页面上了')
    // }
    // componentWillUnmount () {
    //     console.log('组件即将从页面上删除')
    // }
    handleSubmitComment (comment) {
        if (!comment) return 
        if (!comment.username) return alert('请输入用户名...')
        if (!comment.content) return alert('请输入评论内容...')
        const comments = this.state.comments
        comments.push(comment)
        this.setState({ comments })
        // this.mrSaveComments(comments)
        this.props.saveData(comments)
    }
    handleDeleteComment (index) {
        // console.log(index)
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        // this.mrSaveComments(comments)
        this.props.saveData(comments)
    }
    // mrLoadComments () {
    //     let comments = localStorage.getItem('comments')
    //     // 一开始没有存储localStorage的时候,获取到的是字符串 'undefined'
    //     if (comments !== 'undefined') {
    //         comments = JSON.parse(comments)
    //         this.setState({ comments })
    //     }
    // }
    // mrSaveComments (comments) {
    //     localStorage.setItem('comments', JSON.stringify(comments))
    // }
    render() {
        console.log('开始渲染组件...')
        return (
            <div className='wrapper'>
                <CommentInput 
                    onSubmit={this.handleSubmitComment.bind(this)}/> 
                <CommentList 
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }
}
CommentApp = wrapWithLoadData(CommentApp, 'comments')
export default CommentApp