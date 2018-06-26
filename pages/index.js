require('dotenv').config()

if (typeof window !== "undefined") {
	require("aframe")
	require("aframe-react")
	require("aframe-event-set-component")
	require("aframe-animation-component")
	require("aframe-star-system-component")
}

import LoginTemplate from "../templates/login"
import PlayTemplate from "../templates/play"
import ResetCSS from "../components/reset-css"
import { checkUserIsLoggedIn, checkTestMode } from "../utils/misc"

export default class Page extends React.Component {
	constructor() {
		super()

		this.state = {
			isLoggedIn: false,
			mounted: false,
		}
	}

	componentDidMount() {
		this.setState({
			mounted: true,
			isLoggedIn: checkUserIsLoggedIn(window) || checkTestMode(window),
		})
	}

	render() {
		return (
			<main>
				<link
					href="https://fonts.googleapis.com/css?family=Luckiest+Guy"
					rel="stylesheet"
				/>
				<ResetCSS />

				{this.state.isLoggedIn ? (
					<PlayTemplate accessToken={this.state.isLoggedIn} />
				) : this.state.mounted ? (
					<LoginTemplate />
				) : (
					<div />
				)}
			</main>
		)
	}
}
