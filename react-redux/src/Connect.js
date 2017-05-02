import React, { Component } from 'react'
import { PropTypes } from 'prop-types'


export class Provider extends Component {
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext () {
        return {
            store: this.props.store
        }
    }
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


export const connect = (mapStateToProps, mapDispatchToProps) => (WrapComponent) => {
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
            // let stateProps = mapStateToProps(store.getState(), this.props)
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }
        render () {
            return (
                <WrapComponent {...this.state.allProps}/>
            )
        }
    }
    return Connect
}