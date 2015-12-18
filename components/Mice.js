import React, { Component } from 'react'
import { connect } from 'swarm-react'
import Mouse from './Mouse'

class Mice extends Component {

  render() {
    return <div>
      {this.props.data.map((item) => {
        return <Wrapper spec={item.spec()}>
          <Mouse />
        </Wrapper>
      })}
    </div>
  }

}

export default connect(Mice)
