import { Scene } from "aframe-react"
import { map } from "ramda"
import spotify from "../utils/spotify"
import Room from "../components/room"
import Camera from "../components/room"

const LoginTemplate = () => (
	<main>
		<style jsx>{`
			main {
				background: url(/static/images/star-background.gif);
				background-size: cover;
				background-position: center center;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;
			}

			h1 {
				font-size: 8em;
        margin-top: 5rem;
			}

			button {
				border: none;
				outline: none;
				background: none;
				color: white;
				font-size: 4em;
        cursor: pointer;
			}

      button:hover {
        color: grey;
      }
		`}</style>

		{/* <h1>Crate Digger</h1> */}
		<button onClick={spotify.login}>Dig</button>
	</main>
)

export default LoginTemplate
