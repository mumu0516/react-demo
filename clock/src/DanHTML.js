import React, { Component } from 'react'

class DanHTML extends Component {
    constructor () {
        super()
        this.state = {
            content:'<h2>我们都爱笑</h2>'
        }
    }
    render () {
        
        return (
            // {如果真的想要h2标签正常展示,那么需要使用dangerouslySetInnerHTML}
             /*{this.state.content} 只是将h2标签当做文本内容插入，
        并不是插入了h2标签*/
                /*{this.state.content} */
            <div 
                className='editor-wrapper' 
                dangerouslySetInnerHTML={{__html: this.state.content}}
                style={{fontSize:'12px'}}>
            </div>
        )
    }
}

export default DanHTML 