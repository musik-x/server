const axios = require('axios')

const api = axios.create({
    baseURL: `https://api.songkick.com/api/3.0`
})

class Controller {
    static findEvents(req, res) {
        api({
            url: `/search/artists.json?apikey=${process.env.SONGKICK_KEY}&query=${req.params.artist}`,
            method: 'get'
        })
        .then(({data}) => {
            if (!data.resultsPage.results.artist) {
                res
                    .status(404)
                    .json({
                        msg: `Artist not found`
                    })
            } else {
                return api({
                    url: `/artists/${data.resultsPage.results.artist[0].id}/gigography.json?apikey=${process.env.SONGKICK_KEY}&per_page=5`,
                    method: 'get'
                })
                .then(({data}) => {
                    res
                        .status(200)
                        .json(data.resultsPage.results.event)
                })
            }
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal api error`,
                    err
                })
        })
    }
    
    static eventDetails(req, res) {
        api({
            url: `/events/${req.params.id}.json?apikey=${process.env.SONGKICK_KEY}`,
            method: 'get'
        })
        .then(({data}) => {
            res 
                .status(200)
                .json(data.resultsPage.results.event)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err
                })
        })
    }

    static upcomingEvents(req, res) {
        api({
            url: `/search/artists.json?apikey=${process.env.SONGKICK_KEY}&query=${req.params.artist}`,
            method: 'get'
        })
        .then(({data}) => {
            if (!data.resultsPage.results.artist) {
                res
                    .status(404)
                    .json({
                        msg: `Artist not found`
                    })
            } else {
                return api({
                    url: `/artists/${data.resultsPage.results.artist[0].id}/calendar.json?apikey=${process.env.SONGKICK_KEY}&per_page=10`,
                    method: 'get'
                })
                .then(({data}) => {
                    res
                        .status(200)
                        .json(data.resultsPage.results.event)
                })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err
                })
        })
    }
}

module.exports = Controller