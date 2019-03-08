const querystring = require('querystring')
const { axios, baseURL, client_id, client_base64, client_scope, client_redirect, client_state_key } = require('../config/Spotify')
const genRandomString = require('../helpers/genRandomString')
const artisRandom = require('../helpers/spotify/randomArtist')
const spotifyApi = require('../helpers/spotify/spotify')

class SpotifyController {
  static home(req, res, next) {
    spotifyApi.getArtists(artisRandom)
      .then(function (data) {
        res.json(data.body)
      }, next)
  }

  static login(req, res, next) {
    var state = genRandomString(16)
    res.cookie(client_state_key, state)
    res.redirect(baseURL + '/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: client_scope,
        redirect_uri: client_redirect,
        state: state
      }))
  }

  static callback(req, res, next) {
    var state = req.query.state || null
    var storedState = req.cookies ? req.cookies[client_state_key] : null
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }))
    } else {
      res.clearCookie(client_state_key)
      axios
        .post('/api/token', {
          grant_type: 'client_credentials'
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + client_base64,
          }
        })
        .then((prop) => {
          console.log(prop)
        })
        .catch((err) => {
          console.log(err)
          res.json(err.data)
        })
    }
  }
}

module.exports = SpotifyController