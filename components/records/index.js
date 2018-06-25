import { Entity } from "aframe-react"
import { map, addIndex } from "ramda"

const mapIndexed = addIndex(map)

const Asset = ({ id, src }) => <img id={id} src={src} />

const baseRecordPosition = -2.3886948626848357
const recordSize = 0.65

const Record = ({ id, src }, index) => (
	<Entity
		geometry={{ primitive: "plane", width: recordSize, height: recordSize }}
		material={{ src, side: 'double' }}
		scale={{ x: 2, y: 2, z: 2 }}
		position={`${baseRecordPosition - (index / 20)} 0.34330848836327094 -6.7`}
		rotation="-15 83.63000000000001 0"
	/>
)

export default ({ tracks }) => (
	<React.Fragment>
		{mapIndexed(Record, tracks)}
	</React.Fragment>
)
