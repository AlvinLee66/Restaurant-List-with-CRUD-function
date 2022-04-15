const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const provideDefaultInfo = require('../../provideDefaultInfo')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const restaurantInfo = req.body
  const newRestaurantInfo = provideDefaultInfo(restaurantInfo)

  return Restaurant.create(newRestaurantInfo)
    .then(() => res.redirect('/')) // after created return to home page
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('new', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newRestaurantInfo = req.body

  return Restaurant.findByIdAndUpdate(id, newRestaurantInfo)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.get('/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('delete', { restaurant }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router