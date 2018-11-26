/* global fetch */
import queryString from "query-string";
import { join, omit, always } from "ramda";
import createPlayer from "./player";

let player;
let accessToken = "";

const login = () => {
  const loginParams = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: `token`,
    redirect_uri: process.env.SPOTIFY_LOGIN_REDIRECT_URL,
    scope: ["streaming", "user-modify-playback-state", "user-top-read"]
  };

  const query = queryString.stringify(omit(["scope"], loginParams));
  const scope = join("%20", loginParams.scope);
  window.location.href = `https://accounts.spotify.com/authorize?${query}&scope=${scope}`;
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const fetchWebApi = async url => {
  const response = await fetch(url, getHeaders());
  return response.json();
};

const getTracksAnalysis = async ({ ids }) =>
  fetchWebApi(
    `https://api.spotify.com/v1/audio-features/?ids=${join(",", ids)}`
  );

const getTopArtists = async () =>
  fetchWebApi("https://api.spotify.com/v1/me/top/artists");

const getRecommendations = async () =>
  fetchWebApi(`https://api.spotify.com/v1/recommendations`);

const getTopTracks = async ({ id }) =>
  fetchWebApi(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=SE`);

export default {
  login,
  setAccessToken: token => {
    accessToken = token;
  },
  getTopArtists,
  getTopTracks,

  connect: () =>
    new Promise((resolve, reject) => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        player = createPlayer({
          accessToken,
          onReady: resolve,
          onError: message => {
            // @TODO: Nice error handling here
            console.error(message);
            reject(message);
          }
        });
      };
    }),

  play: async ({ uri }) => {
    const {
      _options: { id }
    } = player;

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    return tempo;
  },

  pause: () => {
    player.pause();
  },

  setVolume: value => {
    if (player && value !== 0) player.setVolume(value / 100);
  },

  getCrate: async () => {
    const topArtists = await getTopArtists();
    console.log(topArtists);
  }
};
