import React, { Component } from 'react'
import { connect } from 'swarm-react'
import { mouse } from './mice.css'

class Mouse extends Component {

  render() {
    return <span className={mouse} style={{
      top: this.props.data.x + 'px',
      left: this.props.data.y + 'px'
    }}>{this.props.data.symbol}</span>
  }

}

export default connect(Mouse)
