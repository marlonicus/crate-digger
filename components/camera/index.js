import { Component } from 'react'
import { Entity } from 'aframe-react'

class Camera extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  render () {
    return (
      <Entity
        primitive='a-camera'
        look-controls
        position='-2.472 1.6 -4.328'
        rotation='-15.355000000000002 -1.375 0'
        wasd-controls={false}
      >
        <Entity
          // @TODO: Enable on mobile only
          // raycaster="objects: .clickable"
          // cursor="fuse: false; fuseTimeout: 500"
          // position="0 0 -1"
          // geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.015"
          // material="color: white; shader: flat"
        />
      </Entity>
    )
  }
}

export default Camera
