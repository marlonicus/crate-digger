if (typeof window !== "undefined") {
  require('aframe')
  require('aframe-react')
  require('aframe-event-set-component')
  require('aframe-star-system-component')
}

import queryString from 'query-string'
import { propOr, pathOr, pipe } from 'ramda'
import LoginTemplate from '../templates/login'
import PlayTemplate from '../templates/play'

const getLocationHash = pathOr('', ['location', 'hash'])
const getAccessToken = propOr(false, 'access_token')

const checkUserIsLoggedIn = pipe(
  getLocationHash,
  queryString.parse,
  getAccessToken
)

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
      isLoggedIn: checkUserIsLoggedIn(window),
    })
  }
  
  render() {
    return (
      <main>
        <style jsx gobal>{`
          :global(html, body, main, #__next, a-scene) {
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
            background: #333;
          }
          
        `}</style>
        
        { 
          this.state.isLoggedIn ? 
          <PlayTemplate accessToken={this.state.isLoggedIn} /> : 
          this.state.mounted ? <LoginTemplate />  : <div />
        }
      </main>
    )
  }
}