const db = require('../data/db-config');

function findAll() {
    return db('plants')
    .join('users', 'plants.user_id', 'users.user_id')
    .select('plant_id', 'name', 'species', 'user_id')
}

function findBy(filter) {
    return ('plants')
    .join('users', 'plants.user_id', 'users.user_id')
    .select('user_id', 'plant_id', 'name', 'species')
    .where(filter)
}

function findById(plant_id) {
    return db('plants')
    .join('users', 'plants.user_id', 'users.user_id')
    .select('plant_id', 'name', 'species', 'watering_frequency', 'user_id')
    .where('plant_id', plant_id).first()
}

async function create(plant) {
    const [id] = await db('plants').insert(plant)
    return findById(id)
}

module.exports = {
    findAll,
    findBy,
    findById,
    create
}