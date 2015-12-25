import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import { Wrapper } from 'swarm-react'
import Mice from './Mice'
import {
  app ,
  appConnected
} from './mice.css'

export default class App extends Component {

  render() {
    return <div className={cx(app, {[appConnected]: true})} >
      <Mice spec={this.props.spec} />
    </div>
  }

}

App.contextTypes = {
  swarm:PropTypes.shape({ get: PropTypes.func.isRequired })
}
