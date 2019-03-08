const router = require('express')
  .Router()
const spotifyApi = require('../../helpers/spotify/spotify')

router
  .get('/artist/:id', function ({ params }, res, next) {
    spotifyApi.getArtistAlbums(params.id, { limit: 10 })
      .then(function (data) {
        return data.body.items.map(function (a) {
          return a.id
        })
      })
      .then(function (albums) {
        return spotifyApi.getAlbums(albums, { limit: 5 })
      })
      .then(async function (data) {
        const artist = await spotifyApi.getArtist(params.id)
        res.json({
          artist: artist.body,
          albums: data.body.albums
        })
      })
      .catch(next)

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