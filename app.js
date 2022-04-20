const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3060
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
// 設定樣本引擎
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// 連線資料庫
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connection!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, (req, res) => {
  // res.send('nice!')
  console.log(`App is running on http://localhost:${port}`)
})


