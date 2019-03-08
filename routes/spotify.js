const Spotify = require('../controllers/SpotifyController')

router
  .get('/login', Spotify.login)
  .get('/callback', Spotify.callback)


module.exports = router