const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
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

module.exports = router