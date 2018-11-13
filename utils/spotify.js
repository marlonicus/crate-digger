/* global fetch */
import queryString from "query-string";

const loginParams = {
  client_id: process.env.SPOTIFY_CLIENT_ID,
  response_type: `token`,
  redirect_uri: process.env.SPOTIFY_LOGIN_REDIRECT_URL,
  scope: [
    "streaming",
    "user-read-birthdate",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-private",
    `user-top-read`
  ]
};

const endpoints = {
  login: `https://accounts.spotify.com/authorize?${queryString.stringify(
    loginParams
  )}`,
  topArtists: `https://api.spotify.com/v1/me/top/artists`
};

const getHeaders = ({ accessToken }) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

export default {
  login: () => {
    window.location.href = endpoints.login;
  },

  getTopArtists: async ({ accessToken }) => {
    const response = await fetch(
      endpoints.topArtists,
      getHeaders({ accessToken })
    );
    return response.json();
  },

  connect: ({ accessToken, callback }) => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = accessToken;
      const player = new Spotify.Player({
        name: "Crate Digger",
        getOAuthToken: cb => {
          cb(token);
        }
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", state => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        callback(player);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
    };
  },

  play: ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken, id }
    }
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      });
    });
  }
};
