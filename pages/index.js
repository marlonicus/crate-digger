require('dotenv').config()

import LoginTemplate from '../templates/login'
import PlayTemplate from '../templates/play'
import ResetCSS from '../components/reset-css'
import { checkUserIsLoggedIn, checkTestMode } from '../utils/misc'

export default class Page extends React.Component {
  constructor () {
    super()

    this.state = {
      isLoggedIn: false,
      mounted: false
    }
  }

  componentDidMount () {
    this.setState({
      mounted: true,
      isLoggedIn: checkUserIsLoggedIn(window) || checkTestMode(window)
    })
  }

  render () {
    return (
      <main>
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
