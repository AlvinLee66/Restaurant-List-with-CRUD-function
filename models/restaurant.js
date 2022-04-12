const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String, 
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  rating: {
    type: String,
  },
  description: {
    type: String,
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)