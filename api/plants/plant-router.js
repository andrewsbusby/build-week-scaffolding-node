const router = require('express').Router();
const Plant = require('./plant-model');

router.get('/', async (req, res, next) => {
    try{
        const plant = await Plant.findAll()
        res.json(plant)
    }
    catch(err){
        next(err)
    }
})

router.get('/:plant_id', (req, res, next) => {
  Plant.findById(req.params.plant_id)
    .then(plant => {
        res.json(plant)
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
    const plant = req.body

    Plant.create(plant)
        .then(newPlant => {
            res.status(201).json(newPlant)
        })
        .catch(next)
})

module.exports = router;