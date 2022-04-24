// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const shortUrl = require('./modules/shortUrl')
// 準備引入路由模組
// const ShortUrl = require('./models/shortUrl')
router.use('/project', shortUrl)

// 引入 home 模組程式碼
const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)

// 匯出路由器
module.exports = router
