import { Entity } from "aframe-react"

export default ({ showTurtle }) => (
	<React.Fragment>
		<a-sky color="black"></a-sky>
    {/* <Entity star-system /> */}

		{ showTurtle && (
					<React.Fragment>
						{/* <Entity
							obj-model={{
								obj: `/static/models/room.obj`,
								mtl: `/static/materials/room.mtl`,
							}}
							scale="4.5 4.5 4.5"
							position="0 0 0"
							rotation="0 90 0"
						/> */}
					</React.Fragment>
				)
			}
		}) ()}

	</React.Fragment>
)
