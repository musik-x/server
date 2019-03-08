const querystring = require('querystring')
const { axios, baseURL, client_id, client_secret, client_scope, client_redirect, client_state_key } = require('../config/Spotify')
const genRandomString = require('../helpers/genRandomString')

class SpotifyController {
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
    var code = req.query.code || null
    var state = req.query.state || null
    var storedState = req.cookies ? req.cookies[client_state_key] : null
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }))
    } else {
      res.clearCookie(client_state_key)
      // console.log(client_id, client_secret, '===============')
      // console.log((new Buffer(client_id + ':' + client_secret).toString('base64')))
      axios
        .post('/api/token', {
          grant_type: "client_credentials"
          // params: {
          // }
          // code: code,
          // redirect_uri: client_redirect,
          // grant_type: 'authorization_code'

        }, {
          headers: {
            // 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic NDFhMTJmYThkMzAwNDA5MWIwN2I0YjllNGVkOGY5ZDA6Y2QxZjVmMGUzYjFlNGI2Njk4ODBkYjRmNzZlYjZlYzI=',
          }
        })
        .then((prop) => {
          // console.log(prop)
          console.log(prop)
          // console.log(prop.data)
        })
        .catch((err) => {
          console.log('erroroorooroororo', err)
          res.json(err.data)
        })
    }
  }
}

module.exports = SpotifyController