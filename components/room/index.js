import { Entity } from "aframe-react"

export default () => (
	<React.Fragment>
		<a-sky color="black"></a-sky>
    <Entity star-system />
				
		<Entity
			obj-model={{
				obj: `/static/models/room.obj`,
				mtl: `/static/materials/room.mtl`,
			}}
			scale="4.5 4.5 4.5"
			position="0 0 0"
			rotation="0 90 0"
		/>

		<Entity
			obj-model={{
				obj: `/static/models/turtle.obj`,
				mtl: `/static/materials/turtle.mtl`,
			}}
			scale="0.2 0.2 0.2"
			position="0 -29.46336370617726 0"
			rotation="0 180 0"
		/>
	</React.Fragment>
)
