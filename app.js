const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3060
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const generateShortUrl = require('./generate_shortUrl')
// 設定樣本引擎
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// 連線資料庫
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

app.use(express.static('public'))

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connection!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/success', (req, res) => {
  res.render('success')
})

// 建立shortURL
app.post('/', (req, res) => {
  const shortURL = req.body
  // console.log('random password is: ', shortURL.url)
  const shortUrl = generateShortUrl()
  // console.log(shortUrl)
  res.redirect('/')
  // return ShortUrl.create(req.body) // 存入資料庫
  //   .then(() => res.render('success', { shortUrl: shortUrl }))
  //   .catch(error => console.log(error))
})

// 瀏覽單一餐廳
app.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.listen(port, (req, res) => {
  // res.send('nice!')
  console.log(`App is running on http://localhost:${port}`)
})


