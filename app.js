const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const ShortUrl = require('./models/shortUrl')
const generateShortUrl = require('./generate_shortUrl')
const { redirect } = require('express/lib/response')
require('./config/mongoose')
// 設定樣本引擎
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// 連線資料庫


app.use(express.static('public'))



app.get('/', (req, res) => {
  res.render('index')
})

app.get('/success', (req, res) => {
  res.render('success')
})

// 建立shortURL
app.post('/', (req, res) => {
  let originUrl = req.body.url.split().map(Url => ({ originUrl: Url }))
  let shortUrl = generateShortUrl().split().map(Url => ({ shortUrl: Url }))
  const arrUrl = originUrl.concat(shortUrl)
  const objectUrl = Object.assign({}, ...arrUrl)
  const shortUrl2 = shortUrl[0].shortUrl
  const originUrl2 = originUrl[0].originUrl

  // 輸入相同網址時，產生一樣的縮址。
  ShortUrl.findOne({ originUrl: originUrl2 })
    .then((shortUrl = originUrl.shortUrl))
    .then((shortUrl) => {
      if (shortUrl) {
        console.log('exist already:', shortUrl.shortUrl)
        res.render('success', { shortUrl: shortUrl.shortUrl })
      } else {
        return ShortUrl.create(objectUrl)
          .then(console.log('create new one:', shortUrl2))
          .then(() => res.render('success', { shortUrl: shortUrl2 }))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))


})

// 使用者輸入短網址後跳轉原網址
app.get('/shorturl5566.herokuapp.com/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  return ShortUrl.find({ shortUrl: shortUrl })
    .lean()
    .then(excludeUrl => {
      let filterexcludeUrl = excludeUrl.filter(Url => {
        return Url.shortUrl.includes(shortUrl)
      })
      filterexcludeUrl = filterexcludeUrl[0].originUrl
      if (filterexcludeUrl) {
        res.redirect(filterexcludeUrl)
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})
