import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Mice from './Mice'
import {
  app ,
  appConnected,
  online
} from './mice.css'

export default class App extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      online: true, // FIXME
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
    this.props.mouse.set({
      x: e.pageX - 10,
      y: e.pageY - 14
    })
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
