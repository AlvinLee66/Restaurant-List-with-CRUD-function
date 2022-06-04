const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Restaurant = require('../restaurant')
const userList = require('./users.json')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  const SEED_USER = userList.results
  const restaurants = restaurantList.results
  return Promise.all(Array.from(SEED_USER, seedUser => {
    return bcrypt
    .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
    .then(hash => User.create({
      name: seedUser.name,
      email: seedUser.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      const addRestaurants = restaurants.filter(restaurant => { 
        return seedUser.restaurantId.includes(restaurant.id)
      })
      return Promise.all(Array.from(addRestaurants, restaurant => {
        restaurant.userId = userId
        return Restaurant.create(restaurant)
      }))
    })
  }))
  .then(() => {
    console.log('==== Seed create done. ====')
    process.exit()
  })
  .catch(err => console.log(err))
})