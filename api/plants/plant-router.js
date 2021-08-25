const router = require('express').Router();
const verifyPlant = require('./plants-middleware');
const Plant = require('./plant-model');


router.get('/', async (req, res, next) => {
   let user_id = req.body.subject;
   Plant.findByUserId(user_id)
    .then((plants) => {
        res.status(200).json(plants)
    })
    .catch(next)
})

router.get('/:plant_id', verifyPlant, (req, res) => {
  const plant = res.plant
  res.status(200).json(plant)
})

router.post('/', (req, res, next) => {
    const body = req.body;
    const decoded = req.decoded;
    const newPlant = { ...body, user_id: decoded.subject };
    Plant.add(newPlant)
        .then((created) => {
            res.status(201).json(created)
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    const body = req.body;
    const { id } = req.params
    const decoded = req.decoded
    const plantUpdate = { ...body, user_id: decoded.subject };
    Plant.update(id, plantUpdate)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch(next)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Plant.remove(id)
        .then(response => {
            res.status(200).json(response)
        })
})

module.exports = router;