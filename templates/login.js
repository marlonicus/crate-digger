import spotify from '../utils/spotify'

const LoginTemplate = () => (
  <main>
    <style jsx>{`
			main {
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;
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

    <button onClick={spotify.login}>Dig</button>
  </main>
)

export default LoginTemplate
