const Spotify = require('../../controllers/SpotifyController')
const router = require('express')
  .Router()

router
  .get('/', Spotify.home)
  .get('/login', Spotify.login)
  .get('/callback', Spotify.callback)

module.exports = router