const axios = require('axios')

class Controller {
    static search(req, res) {
        axios({
            url: `https://content.guardianapis.com/search?q=${req.params.keyword}&${process.env.GUARDIAN_KEY}`,
            method: 'get'
        })
        .then(({data}) => {
            res
                .status(200)
                .json(data.response.results)
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