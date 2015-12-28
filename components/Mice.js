import React, { Component } from 'react'
import { connect } from 'swarm-react'
import Mouse from './Mouse'

class Mice extends Component {

  render() {
    return <span>
      {this.props.data.map((item, i) => <Mouse key={i} spec={item.spec().toString()} />)}
    </span>
  }

}

export default connect(Mice)
