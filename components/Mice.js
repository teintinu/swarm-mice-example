import React, { Component } from 'react'
import { connect } from 'swarm-react'
import Mouse from './Mouse'

class Mice extends Component {

  render() {
    return <div>
      {this.props.data.map((item) => <Mouse  spec={item.spec()} />)}
    </div>
  }

}

export default connect(Mice)
