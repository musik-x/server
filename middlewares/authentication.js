const { decode } = require('../helpers/jwt')

function authentication(req, res, next) {
    if (!req.headers.access_token) {
        res
            .status(401)
            .json({
                msg: `Unauthorized Access`
            })
    } else {
        try {
            let decoding = decode(req.headers.access_token)
            req.decoded = decoding
            next()
        } catch(err) {
            if (JSON.stringify(err.name) == 'JsonWebTokenError') {
                res
                    .status(401)
                    .json({
                        msg: `Unauthorized Access: Invalid Token`,
                        err: err
                    })
            } else {
                res
                    .status(401)
                    .json({
                        msg: `Unauthorized Access: Invalid Token`,
                        err: err
                    })
            }
        }
    }
}

module.exports = authentication