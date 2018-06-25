import queryString from 'query-string'
import { pick } from 'ramda'

const loginParams = {
  client_id: `235bc1f2864a44f0b632987308433ca8`,
  response_type: `token`,
  redirect_uri: `http://127.0.0.1:3000/`,
  scope: `user-top-read`
}

const endpoints = {
  login: `https://accounts.spotify.com/authorize?${ queryString.stringify(loginParams) }`,
  topArtists: `https://api.spotify.com/v1/me/top/artists`,
}

const getHeaders = ({ accessToken }) => ({
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})

export default {
  login: () => location.href = endpoints.login,
  
  getTopArtists: async ({ accessToken }) => {
    const response = await fetch(endpoints.topArtists, getHeaders({ accessToken }))
    return await response.json()
  }
}