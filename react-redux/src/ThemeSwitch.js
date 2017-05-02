import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from './Connect'

class ThemeSwitch extends Component {
    static contextTypes = {
        // store: PropTypes.object
        themeColor: PropTypes.string,
        onSwitchColor: PropTypes.func
    }
    // constructor () {
    //     super()
    //     this.state = { themeColor: '' }
    // }
    // componentWillMount () {
    //     const { store } = this.context
    //     this.mrUpdateColor()
    //     store.subscribe(() => this.mrUpdateColor())
    // }
    // handleSwitchColor (color) {
    //     const { store } = this.context
    //     store.dispatch({
    //         type: 'CHANGE_COLOR',
    //         themeColor: color
    //     })
    // }
    handleSwitchColor (color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }
    // mrUpdateColor () {
    //     const { store } = this.context
    //     const state = store.getState()
    //     this.setState({ themeColor: state.themeColor })
    // }
    render () {
        return (
            <div>
                <button 
                style={{ color: this.props.themeColor }}
                onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
                <button 
                style={{ color: this.props.themeColor }}
                onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_COLOR', themeColor: color })
        }
    }
}

ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)
export default ThemeSwitch