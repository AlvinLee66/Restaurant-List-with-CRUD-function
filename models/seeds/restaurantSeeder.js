const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')

db.once('open', () => {
  const restaurant = restaurantList.results
  restaurant.forEach(restaurant => {
    Restaurant.create({
      name: `${restaurant.name}`,
      name_en: `${restaurant.name_en}`,
      category: `${restaurant.category}`,
      image: `${restaurant.image}`,
      location: `${restaurant.location}`,
      phone: `${restaurant.phone}`,
      rating: `${restaurant.rating}`,
      description: `${restaurant.description}`
    })
  })
  console.log('==== Done! ====')
})