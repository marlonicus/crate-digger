import { Entity } from "aframe-react"

export default () => (
	<React.Fragment>
		<Entity
			obj-model={{
				obj: `/static/models/room.obj`,
				mtl: `/static/materials/room.mtl`,
			}}
			scale="4.5 4.5 4.5"
			position="0 0 0"
			rotation="0 90 0"
		/>

		<a-box
			side="double"
			color="#93be8b"
			depth="2"
			geometry=""
			height="4"
			width="0.5"
			scale="27.53 3.91 8.1"
			position="0.39 3.39 -0.25"
		/>
	</React.Fragment>
)
