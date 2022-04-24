// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const ShortUrl = require('../../models/shortUrl')

// 使用者輸入短網址後跳轉原網址
router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  ShortUrl.findOne({ shortUrl })
    .lean()
    .then((data) => { return res.redirect(data.originUrl) })
    .catch(error => console.log(error))
})

module.exports = router
