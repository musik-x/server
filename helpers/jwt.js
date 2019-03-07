require('dotenv').config()
const jwt = require('jsonwebtoken');

function generate(user) {
    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email
    }, process.env.JWT_SECRET);
    return token
}

function decode(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

module.exports = { generate, decode }