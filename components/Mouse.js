import React, { Component } from 'react'
import { connect } from 'swarm-react'
import { mouse } from './mice.css'

class Mouse extends Component {

  handleClick() {
    this.props.set({
      symbol: String.fromCharCode(10000 + Math.round(Math.random() * 10000 % 60))
    })
  }

  render() {
    return <span
      onClick={this.handleClick.bind(this)}
      className={mouse}
      style={{
        top: this.props.data.y + 'px',
        left: this.props.data.x + 'px'
      }}
    >
      {this.props.data.symbol}
    </span>
  }

}

export default connect(Mouse)
