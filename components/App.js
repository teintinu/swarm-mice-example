import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Mice from './Mice'
import {
  app ,
  appConnected,
  online
} from './mice.css'

const FREQ = 30

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.timer = null
    this.state = {
      online: true,
      connected: true // FIXME
    }
  }

  handleOnline(e) {
    const online = !this.state.online
    const { swarm } = this.context // swarm.host

    this.setState({ online })

    if (online) {
      // TODO: connect
    } else {
      // TODO: disconnect
    }
  }

  handleMove(e) {
    const x = e.clientX - 10
    const y = e.clientY - 16

    this.timer = this.timer || setTimeout(() => {
      this.props.mouse.set({x, y})
      this.timer = null
    }, FREQ)
  }

  render() {
    return <span>
      <div
        className={cx(app, {[appConnected]: this.state.connected})}
        onMouseMove={this.handleMove.bind(this)}
      >
        <Mice spec={this.props.mice.spec().toString()} />
      </div>
      <label className={online}>
        <input type='checkbox' checked={this.state.online} onChange={this.handleOnline.bind(this)} />
        online
      </label>
    </span>
  }

}

App.contextTypes = {
  swarm: PropTypes.shape({ get: PropTypes.func.isRequired })
}
