const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

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

app.use(routes)

// set port
app.listen(port, () => {
  console.log(`==== App is running on http://localhost:${port} ====`)
})