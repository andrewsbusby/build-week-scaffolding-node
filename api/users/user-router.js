const router = require('express').Router();
const User = require('./user-model');

router.get('/', async (req, res, next) => {
    try{
        const user = await User.getAll()
        res.json(user)
    }
    catch(err){
        next(err)
    }
})

router.get('/:user_id', async (req, res, next) => {
    User.getById(req.params.user_id)
        .then(user => {
            res.json(user)
        })
        .catch(next)
    
})

router.post('/', (req, res, next) => {
    const user = req.body

    User.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(next)
})

module.exports = router;