/* global fetch */
import queryString from "query-string";
import { join, omit, map, prop, find, propEq } from "ramda";
import createPlayer from "./player";
import { takeRandX, mapIndexed } from "../misc";
import canvas from "../canvas";
import mock from "../../data/mock";

const CUSTOM_PLAYLIST_NAME = "Crate Digger 💎";

let player;
let market = "";
let userId = "";
let customPlaylist = false;
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
      "user-read-email",
      "playlist-modify-public"
    ]
  };

  const query = queryString.stringify(omit(["scope"], loginParams));
  const scope = join("%20", loginParams.scope);
  window.location.href = `https://accounts.spotify.com/authorize?${query}&scope=${scope}`;
};

const getHeaders = ({ args } = {}) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    ...args
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

const createPlaylist = async () => {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      ...getHeaders({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        name: CUSTOM_PLAYLIST_NAME,
        description: "Gems found with crate-digger.netlify.com"
      })
    }
  );

  const { id } = await response.json();
  customPlaylist = id;
};

const addToPlaylist = async ({ uri }) =>
  fetch(`https://api.spotify.com/v1/playlists/${customPlaylist}/tracks`, {
    method: "POST",
    ...getHeaders({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      uris: [uri]
    })
  });

const findCustomPlaylist = async () => {
  const { items } = await fetchWebApi(
    `https://api.spotify.com/v1/me/playlists`
  );
  const searchResult = find(propEq("name", CUSTOM_PLAYLIST_NAME), items);
  if (searchResult) {
    customPlaylist = searchResult.id;
    return searchResult.id;
  }
  return false;
};

const getRandomGenres = async () => {
  const { genres } = await getGenreSeeds();
  return takeRandX(8)(genres);
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

// @TODO: Make this function functional.
const addAlbumInfoToCrateTracks = ({ crate }) => {
  const newTracks = map(track => ({
    ...track,
    albumArtImage: canvas.albumInfo(track)
  }), crate.content.tracks)
  crate.content.tracks = newTracks;
  return crate;
}

const addImageLabelsToCrates = ({ crates }) =>
  map(crate => ({
    ...addAlbumInfoToCrateTracks({ crate }),
    labelImage: canvas.label(crate.genre),
    labelRotation: Math.random() * 7 - 3.5
  }), crates)

export default {
  login,

  setAccessToken: token => {
    accessToken = token;
  },

  saveToPlaylist: async ({ uri }) => {
    if (!customPlaylist) {
      const foundPlaylist = await findCustomPlaylist();
      if (!foundPlaylist) {
        await createPlaylist();
      }
    }

    addToPlaylist({ uri });
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
    let cratesWithAnalyses = mock;

    if (!process.env.DEV) {
      const { country, id } = await getMe();
      market = country;
      userId = id;

      const genres = await getRandomGenres();
      const crates = await createBasicGenreCrates({ genres });
      cratesWithAnalyses = await addTrackAnalysesToCrates({ crates });
    }
    console.log(cratesWithAnalyses)

    const cratesWithImageLabels = await addImageLabelsToCrates({ crates: cratesWithAnalyses })

    return cratesWithImageLabels;
  }
};
