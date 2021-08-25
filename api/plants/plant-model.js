const db = require('../data/db-config');

function find() {
    return db('plants')
}

function findByUserId(user_id){
    return db('plants').where('user_id', user_id)
}

function findById(plant_id){
    return db('plants').where('plant_id', plant_id).first()
}

async function add(newPlant){
    const [plant_id] = await db('plants').insert(newPlant, 'plant_id')
    return findById(plant_id)
} 

async function update(plant_id, updated){
    await db('plants').update(updated).where('plant_id', plant_id)
    return findById(plant_id)
}

async function remove(id){
    return db('plants').where('plant_id', id).del()
}

module.exports = {
   find,
   findByUserId,
   findById,
   add,
   update,
   remove
}