const axios = require('axios')
const baseURL = 'https://accounts.spotify.com'

// 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
module.exports = {
  axios: axios.create({
    baseURL: 'https://accounts.spotify.com',
    // timeout: 3000
  }),
  baseURL,
  client_id: process.env.SPOTIFY_CLIENT_ID,
  client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  client_redirect: process.env.SPOTIFY_REDIRECT,
  client_state_key: process.env.SPOTIFY_STATE_KEY,
  client_scope: process.env.SPOTIFY_SCOPE
}