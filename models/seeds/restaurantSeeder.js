const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // set restaurant model
const restaurantList = require('./restaurant.json')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('==== mongodb error ====!')
})
db.once('open', () => {
  console.log('==== mongodb connected! ====')
  const restaurant = restaurantList.results
  restaurant.forEach(restaurant => {
    Restaurant.create({
      id: `${restaurant.id}`,
      name: `${restaurant.name}`,
      name_en: `${restaurant.name_en}`,
      category: `${restaurant.category}`,
      image: `${restaurant.image}`,
      location: `${restaurant.location}`,
      phone: `${restaurant.phone}`,
      rating: `${restaurant.rating}`,
      description: `${restaurant.description}`
    })
  });
  console.log('==== Done! ====')
})