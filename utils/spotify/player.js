export default ({ accessToken, onReady, onError }) => {
  const player = new Spotify.Player({
    name: "Crate Digger",
    getOAuthToken: cb => {
      console.log("CALLING BACK", accessToken);
      cb(accessToken);
    }
  });

  player.addListener("initialization_error", ({ message }) => onError(message));
  player.addListener("authentication_error", ({ message }) => onError(message));
  player.addListener("account_error", ({ message }) => onError(message));
  player.addListener("playback_error", ({ message }) => onError(message));
  player.addListener("player_state_changed", state => console.log(state));
  player.addListener("ready", () => onReady());
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  player.connect();
};
