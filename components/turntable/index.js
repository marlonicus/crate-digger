import { Entity } from 'aframe-react'

const Turntable = ({ onClick }) => (
  <>
    <Entity
      obj-model='obj:/static/models/turntable.obj;mtl:/static/materials/turntable.mtl'
      scale='0.0015 0.0015 0.0015'
      position='-s4.361213064777393 -0.568567439253602 -4.293583331148955'
      rotation='0 95.43 0'
    />

    <Entity
      obj-model='obj:/static/models/table-speakers.obj;mtl:/static/materials/table-speakers.mtl'
      scale='5 4.68 3.6'
      position='-3.6454546289990306 -0.05851137977826215 -7.125502725534819'
      rotation=''
    />
  </>
)

export default Turntable
