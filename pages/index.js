import LoginTemplate from "../templates/login";
import PlayTemplate from "../templates/play";
import spotify from "../utils/spotify";
import { checkUserIsLoggedIn, checkTestMode } from "../utils/misc";

export default class Page extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      mounted: false
    };
  }

  componentDidMount() {
    const accessToken = checkUserIsLoggedIn(window);
    spotify.setAccessToken(accessToken);

    this.setState({
      mounted: true,
      isLoggedIn: accessToken || checkTestMode(window)
    });
  }

  render() {
    return (
      <main>
        {!this.state.mounted ? (
          <p>Loading</p>
        ) : this.state.isLoggedIn ? (
          <PlayTemplate accessToken={this.state.isLoggedIn} />
        ) : (
          <LoginTemplate />
        )}
      </main>
    );
  }
}
