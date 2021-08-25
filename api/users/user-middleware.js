const User = require('./user-model');

const checkUserId = async (req, res, next) => {
    const { id } = req.params

    const user = await User.getById(id)
    if(!user) {
        res.status(404).json({
            message: `user with id ${id} not found`
        })
    } else {
        req.user = user
        next()
    }
}

module.exports = {
    checkUserId
}