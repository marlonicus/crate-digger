import spotify from '../utils/spotify'

const LoginTemplate = () => (
  <main>
    <h1>Title</h1>
    <button onClick={spotify.login}>Click here to login</button>
  </main>
)

export default LoginTemplate