const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

// 設定樣本引擎
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// 連線資料庫
app.use(express.static('public'))

// 將 request 導入路由器
app.use(routes)

app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})
