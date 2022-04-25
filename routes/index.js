// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')

// 引入 home 模組程式碼
router.use('/', home)

// 匯出路由器
module.exports = router
