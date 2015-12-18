import React, { Component } from 'react'
import { Wrapper } from 'swarm-react'
import Mouse from './Mouse'

export default class Mice extends Component {

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
