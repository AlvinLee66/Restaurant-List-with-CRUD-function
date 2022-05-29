const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortByWay = require('../../sortByWay')

// set home page
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({_id: 'asc'})
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.toLowerCase().trim()

  if (!keyword.length) {
    return res.redirect('/')
  }

  Restaurant.find({ userId })
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

router.get('/:sort', (req, res) => {
  const userId = req.user._id
  const way = req.params.sort
  Restaurant.find({ userId })
    .lean()
    .sort(sortByWay(way))
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router