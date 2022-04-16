const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortByWay = require('../../sortByWay')

// set home page
router.get('/', (req, res) => {
  // get all restaurant data
  Restaurant.find()
    .lean()
    .sort({_id: 'asc'})
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()

  if (!keyword.length) {
    return res.redirect('/')
  }

  Restaurant.find()
    .lean()
    .then(restaurantData => {
      const restaurants = restaurantData.filter(restaurant => {
        const combineNameAndCategory = restaurant.name + restaurant.category
        return combineNameAndCategory.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

router.get('/:way', (req, res) => {
  const way = req.params.way
  Restaurant.find()
    .lean()
    .sort(sortByWay(way))
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router