exports.seed = function(knex) {
    const users = [
        {
            username: 'andrew',
            password: '1234',
            phoneNumber: '555-1234'
        }
    ]

    const plants = [
        {
            name: 'sunflower',
            species: 'latin',
            watering_frequency: 'every 2 days',
            user_id: 1
        },
        {
            name: 'lily',
            species: 'latin',
            watering_frequency: 'once a week',
            user_id: 1
        }
    ]

    return knex('users').insert(users)
        .then(() => {
            return knex('plants').insert(plants)
        })
}