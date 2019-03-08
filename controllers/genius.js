const api = require('genius-api');
const genius = new api(process.env.GENIUS_ACCESS_TOKEN);

class Controller {
    static search(req, res) {
        genius
            .search(req.params.query)
            .then(function(response) {
                res
                    .status(200)
                    .json(response.hits)
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