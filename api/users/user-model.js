const db = require('../data/db-config');

function getAll() {
    return db('users').select('username', 'user_id');
}

function getById(user_id) {
    return db('users')
    .select('username', 'user_id', 'created_at')
    .where('user_id', user_id).first()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return getById(id)
}

module.exports = {
    getAll,
    getById,
    add
};