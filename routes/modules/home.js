const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// set home page
router.get('/', (req, res) => {
  // get all restaurant data
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router