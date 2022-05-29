const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const provideDefaultInfo = require('../../provideDefaultInfo')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurantInfo = req.body
  const combineRestaurantInfo = provideDefaultInfo(restaurantInfo)
  combineRestaurantInfo.userId = userId
  return Restaurant.create(combineRestaurantInfo)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('new', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const newRestaurantInfo = req.body
  newRestaurantInfo.userId = userId
  newRestaurantInfo._id = _id
  return Restaurant.findOneAndUpdate({ _id, userId }, newRestaurantInfo)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.get('/:id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('delete', { restaurant }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router