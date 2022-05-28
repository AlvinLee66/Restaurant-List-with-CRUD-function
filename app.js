const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(routes)

// set port
app.listen(port, () => {
  console.log(`==== App is running on http://localhost:${port} ====`)
})