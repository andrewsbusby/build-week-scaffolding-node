const db = require('../data/db-config');
const { findById } = require('../plants/plant-model');

function getAll() {
    return db('users').select('username', 'user_id');
}

function getBy(filter){
    return db('users')
    .select('user_id', 'username', 'phoneNumber', 'password')
    .where(filter)
}

function getById(user_id) {
    return db('users')
    .select('username', 'user_id', 'created_at')
    .where('user_id', user_id).first()
}

async function add(user) {
    const [id] = await db('users').insert(user, 'user_id')
    return getById(id)
}

async function update(id, change) {
    await db('users')
    .select('user_id', 'username', 'phoneNumber', 'password')
    .where('user_id', id)
    .update(change)

    return findById(id)
}

module.exports = {
    getAll,
    getBy,
    getById,
    add,
    update
};