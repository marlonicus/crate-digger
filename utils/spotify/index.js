/* global fetch */
import queryString from "query-string";
import { join, omit, map, prop } from "ramda";
import createPlayer from "./player";
import { takeRandX, mapIndexed } from "../misc";

let player;
let market = "";
let accessToken = "";

const login = () => {
  const loginParams = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: `token`,
    redirect_uri: process.env.SPOTIFY_LOGIN_REDIRECT_URL,
    scope: [
      "streaming",
      "user-modify-playback-state",
      "user-top-read",
      "user-read-private",
      "user-read-birthdate",
      "user-read-email"
    ]
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

const getTracksAnalyses = async ({ ids }) =>
  fetchWebApi(
    `https://api.spotify.com/v1/audio-features/?ids=${join(",", ids)}`
  );

const getRecommendationsFromGenre = async ({ genre }) =>
  fetchWebApi(
    `https://api.spotify.com/v1/recommendations?market=${market}&seed_genres=${genre}&limit=10`
  );

const getMe = async () => fetchWebApi(`https://api.spotify.com/v1/me`);

const getGenreSeeds = async () =>
  fetchWebApi(
    `https://api.spotify.com/v1/recommendations/available-genre-seeds`
  );

const getRandomGenres = async () => {
  const { genres } = await getGenreSeeds();
  return takeRandX(5)(genres);
};

const addTrackAnalysesToCrates = async ({ crates }) => {
  const tracksWithTempos = await Promise.all(
    map(async crate => {
      const { tracks } = crate.content;
      const ids = map(prop("id"), tracks);
      const { audio_features: analyses } = await getTracksAnalyses({ ids });
      const content = {
        ...crate.content,
        tracks: mapIndexed(
          (track, index) => ({
            ...track,
            tempo: analyses[index].tempo
          }),
          tracks
        )
      };
      return {
        ...crate,
        content
      };
    }, crates)
  );

  return tracksWithTempos;
};

const createBasicGenreCrates = async ({ genres }) => {
  const crates = await Promise.all(
    map(
      async ([genre]) => ({
        genre,
        content: await getRecommendationsFromGenre({ genre })
      }),
      genres
    )
  );

  return crates;
};

export default {
  login,

  setAccessToken: token => {
    accessToken = token;
  },

  connect: () =>
    new Promise((resolve, reject) => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("Creating new player with", accessToken);
        player = createPlayer({
          accessToken,
          onReady: resolve,
          onError: message => {
            // @TODO: Handle this gracefully
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
  },

  pause: () => {
    player && player.pause();
  },

  setVolume: value => {
    if (player && value !== 0) player.setVolume(value / 100);
  },

  getCrates: async () => {
    const { country } = await getMe();
    market = country;

    const genres = await getRandomGenres();
    const crates = await createBasicGenreCrates({ genres });
    const cratesWithAnalyses = await addTrackAnalysesToCrates({ crates });

    console.log(cratesWithAnalyses);

    return cratesWithAnalyses;
  }
};
