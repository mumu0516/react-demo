import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

export const connect = (mapStateToProps) => (WrapComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor () {
            super()
            this.state = { allProps: {} }
        }
        componentWillMount () {
            const { store } = this.context
            this.mrUpdateProps()
            store.subscribe(() => this.mrUpdateProps())
        }
        mrUpdateProps () {
            const { store } = this.context
            let stateProps = mapStateToProps(store.getState(), this.props)
            this.setState({
                allProps: {
                    ...stateProps,
                    ...this.props
                }
            })
        }
        render () {
            const { store } = this.context
            let stateProps = mapStateToProps(store.getState())
            return (
                <WrapComponent {...stateProps}/>
            )
        }
    }
    return Connect
}