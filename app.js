const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const provideDefaultInfo = require('./provideDefaultInfo')
const methodOverride = require('method-override')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true}) // set connect to mongoDB
mongoose.set('useFindAndModify', false)

const db = mongoose.connection // get mongoose connection status

// connect error
db.on('error', () => {
  console.log('==== mongodb error ====!')
})

// connect success
db.once('open', () => {
  console.log('==== mongodb connected! ====')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// set home page
app.get('/', (req, res) => {
  // get all restaurant data
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const restaurantInfo = req.body
  const newRestaurantInfo = provideDefaultInfo(restaurantInfo)

  return Restaurant.create(newRestaurantInfo)
    .then(() => res.redirect('/')) // after created return to home page
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('new', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const newRestaurantInfo = req.body

  return Restaurant.findByIdAndUpdate(id, newRestaurantInfo)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('delete', { restaurant }))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// set port
app.listen(port, () => {
  console.log(`==== App is running on http://localhost:${port} ====`)
})