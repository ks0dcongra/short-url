const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const ShortUrl = require('./models/shortUrl')
const generateShortUrl = require('./generate_shortUrl')
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
  const originUrl = req.body.url.split().map(Url => ({ originUrl: Url }))
  let shortUrl = generateShortUrl().split().map(Url => ({ shortUrl: Url }))
  const arrUrl = originUrl.concat(shortUrl)
  const objectUrl = Object.assign({}, ...arrUrl)
  let shortUrl2 = shortUrl[0].shortUrl
  const originUrl2 = originUrl[0].originUrl
  const arrExist = []

  // 避免短網址重複
  ShortUrl.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => {
      data = data[0]
      if (!data) {
        console.log('first add URL in mongoose')
        arrExist.push(shortUrl2)
        objectUrl.arrExist = arrExist
      } else {
        while (data.arrExist.some((n) => n === shortUrl2)) {
          console.log('RandomCode exist already:', data.arrExist.some((n) => n === shortUrl2))
          shortUrl = generateShortUrl().split().map(Url => ({ shortUrl: Url }))
          shortUrl2 = shortUrl[0].shortUrl
        }

        data.arrExist.push(shortUrl2)
        objectUrl.arrExist = data.arrExist
      }
    })

  // 輸入相同網址時，產生一樣的短往址。
  ShortUrl.findOne({ originUrl: originUrl2 })
    .then((data) => {
      if (data) {
        console.log('URL exist already:', data.shortUrl)
        res.render('success', { shortUrl: data.shortUrl })
      } else {
        return ShortUrl.create(objectUrl)
          .then(console.log('create new one URL:', shortUrl2))
          .then(() => res.render('success', { shortUrl: shortUrl2 }))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})

// 使用者輸入短網址後跳轉原網址
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  if (shortUrl) {
    ShortUrl.find({ shortUrl })
      .lean()
      .then(excludeUrl => {
        let filterexcludeUrl = excludeUrl.filter(Url => {
          return Url.shortUrl.includes(shortUrl)
        })
        filterexcludeUrl = filterexcludeUrl[0].originUrl
        console.log(filterexcludeUrl)
        if (filterexcludeUrl) {
          return res.redirect(filterexcludeUrl)
        }
      })
      .catch(error => console.log(error))
  }

})

app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})
