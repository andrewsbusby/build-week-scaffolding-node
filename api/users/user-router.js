const router = require('express').Router();
const bycrypt = require('bcryptjs');
const User = require('./user-model');
const { checkUserId } = require('./user-middleware');

router.get('/', async (req, res, next) => {
    try{
        const user = await User.getAll()
        res.json(user)
    }
    catch(err){
        next(err)
    }
})

router.get('/:user_id', checkUserId,  async (req, res, next) => {
    User.getById(req.params.user_id)
        .then(user => {
            res.json(user)
        })
        .catch(next)
    
})

router.put('/',  (req, res, next) => {
    const user_id = req.decoded.subject;

    let user = req.body;
    const hash = bycrypt.hashSync(user.password, 8);

    user.password = hash
    User.update(user_id, user)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
})

module.exports = router;