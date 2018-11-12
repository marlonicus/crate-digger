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
        position='0.118 1.600 45.623'
        rotation='-6.532 0.344 0'
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
