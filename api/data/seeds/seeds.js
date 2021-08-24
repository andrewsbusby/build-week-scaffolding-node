exports.seed = async function(knex) {
    await knex('plants').truncate()
    await knex('users').truncate()
    await knex('users').insert([
        { user_id: 1,
          username: 'andrew',
          email: 'andrew@andrew.com',
          password: '1234'
        }
    ])
    await knex('plants').insert([
        {
            plant_id: 1,
            name: 'test',
            species: 'teset',
            watering_frequency: 'test',
            user_id: 1
        },
        
        {
            plant_id: 2,
            name: 'test2',
            species: 'test2',
            watering_frequency: 'test2',
            user_id: 1
        }
    ])
}