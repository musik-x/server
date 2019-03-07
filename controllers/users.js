require('dotenv').config()
const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(`${process.env.CLIENT_ID}`)
const { generate } = require('../helpers/jwt')

class Controller {
    static login(req, res) {
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            let userDataToInput = {
                name: ticket.payload.name,
                password: process.env.AUTO_GENERATE_PASSWORD,
                email: ticket.payload.email,
                image: ticket.payload.picture
            }
            return User.findOne({
                email: ticket.payload.email
            })
            .then(user => {
                if (!user) {
                    return User
                            .create(userDataToInput)    
                            .then(newUser => {
                                let token = generate(newUser)
                                res
                                    .status(200)
                                    .json(token)
                            })
                } else {
                    let token = generate(user)
                    res
                        .status(200)
                        .json(token)
                }
            })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })
        })        
    }
}

module.exports = Controller