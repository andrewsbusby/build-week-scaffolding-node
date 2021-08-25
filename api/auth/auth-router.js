const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/user-model');
const secret = require('../data/secret');
const router = require('express').Router();

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    User.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    User.getBy({ username })
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = makeToken(user)
                res.status(200).json({ 
                    message: `Welcome, ${user.username}`, token
                })
            } else {
                res.status(401).json({
                    message: 'invalid login credentials'
                })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
})

function makeToken(user){
    const payload = {
        subject: user.user_id,
        username: user.username,
        phoneNumber: user.phoneNumber
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

module.exports = router;