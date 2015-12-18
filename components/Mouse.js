import React, { Component } from 'react'
import { mouse } from './mice.css'

export default class Mouse extends Component {

  render() {
    return <span className={mouse} style={{
      top: this.props.data.x + 'px',
      left: this.props.data.y + 'px'
    }}>{this.props.data.symbol}</span>
  }

}
