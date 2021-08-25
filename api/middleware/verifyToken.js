const jwt = require('jsonwebtoken');
const secret = require('../data/secret');

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        res.status(401).json({ message: 'You do not have an authenticated token'})
    } else {
        jwt.verify(token, secret, (err, decoded) =>{
            if (err) {
                res.status(401).json('Token is invalid' + err.message)
            } else {
                req.decoded = decoded
                next()
            }
        } )
    }
} 