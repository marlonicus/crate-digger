/* global fetch */
import queryString from 'query-string'

const loginParams = {
  client_id: process.env.SPOTIFY_CLIENT_ID,
  response_type: `token`,
  redirect_uri: process.env.SPOTIFY_LOGIN_REDIRECT_URL,
  scope: `user-top-read`
}

const endpoints = {
  login: `https://accounts.spotify.com/authorize?${queryString.stringify(loginParams)}`,
  topArtists: `https://api.spotify.com/v1/me/top/artists`
}

const getHeaders = ({ accessToken }) => ({
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})

export default {
  login: () => { window.location.href = endpoints.login },

  getTopArtists: async ({ accessToken }) => {
    const response = await fetch(endpoints.topArtists, getHeaders({ accessToken }))
    return response.json()
  }
}
