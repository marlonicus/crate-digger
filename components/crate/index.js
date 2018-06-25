import { Entity } from "aframe-react"

export default () => (
  <React.Fragment>
    <a-entity obj-model="obj:/static/models/small-crate.obj;mtl:/static/materials/small-crate.mtl" scale="2.57 2 2" position="-2.8342750937505734 -0.15575701494627192 -6.679" rotation="0 -9.340000000000003 -180"></a-entity>
    <Entity obj-model="obj:/static/models/big-chest.obj;mtl:/static/materials/big-chest.mtl" scale="16 16 16" position="-3.0703056082864655 -1.7103249751427276 -6.653139428189727" rotation="0 29.999999999999996 0" />
  </React.Fragment>
)