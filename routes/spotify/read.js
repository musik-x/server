const router = require('express')
  .Router()
const spotifyApi = require('../../helpers/spotify')

router
  .get('/artist/:id', function ({ params }, res, next) {
    spotifyApi.getArtist(params.id)
      .then(function (data) {
        res.json(data.body)
      }, function (err) {
        res.json(err.data)
      })

  })
  .post('/artists/', function ({ body }, res, next) {
    if (!(body.id instanceof Array)) {
      body.id = [body.id]
    }
    spotifyApi.getArtists(body.id)
      .then(function (data) {
        res.json(data.body)
      }, function (err) {
        res.json(err.data)
      })
  })

router
  .get('/user/:username', function ({ params }, res, next) {
    spotifyApi.getUser(params.username)
      .then(function (data) {
        res.json(data.body)
      }, function (err) {
        res.json(err.data)
      })


  })

module.exports = router