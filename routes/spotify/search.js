const router = require('express')
  .Router()
const spotifyApi = require('../../helpers/spotify')

router
  .get('/track/:keyword', ({ params }, res, next) => {
    spotifyApi.searchTracks(params.keyword)
      .then(function (data) {
        console.log('Search by "Love"', data)
        res.json(data.body)
      }, function (err) {
        console.error(err)
        res.json(err.data)
      })

  })
  .get('/artists/:keyword', ({ params }, res, next) => {
    spotifyApi.searchArtists(params.keyword)
      .then(function (data) {
        console.log('Search by "Love"', data)
        res.json(data.body)
      }, function (err) {
        console.error(err)
        res.json(err.data)
      })

  })

module.exports = router