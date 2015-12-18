import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import { app } from './mice.css'
import { Wrapper } from 'swarm-react'
import { Host } from 'swarm-syncable'
import Mice from './Mice'

export default class App extends Component {

  render() {
    return <div className={cx(app, {[appConnected]: true})} >
      <Wrapper spec={this.props.spec}>
        <Mice />
      </Wrapper>
    </div>
  }

}

App.contextTypes = {
  swarm: PropTypes.instanceOf(Host)
}
