import { Scene } from "aframe-react"
import { map } from "ramda"
import spotify from "../utils/spotify"
import Room from "../components/room"
import Crate from "../components/crate"
import Records from "../components/records"
import Camera from "../components/camera"
import { checkTestMode } from "../utils/misc"
import { userData as mockUserData } from "../data/mock"

const getRecordFromTrackItem = ({ id, images, name }) => ({
	id, 
	name,
	src: images[1].url
})

class PlayTemplate extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	componentDidMount = async () => {
		if (checkTestMode(window)) {
			return this.setState({
				userData: mockUserData,
			})
		}
		
		const userData = await spotify.getTopArtists({
			accessToken: this.props.accessToken,
		})

		this.setState({
			userData,
		})
	}

	render() {
		return (
			<Scene vr-mode-ui={{enabled: true}}>
				<Room showTurtle={true} />
				<Crate />
				{ this.state.userData && <Records tracks={map(getRecordFromTrackItem, this.state.userData.items)} /> }
				<Camera />
			</Scene>
		)
	}
}

export default PlayTemplate
