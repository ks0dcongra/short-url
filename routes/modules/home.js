// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const ShortUrl = require('../../models/shortUrl')
const generateShortUrl = require('../../utils/generateShortUrl')
const tryHttp = require('../../utils/tryHttp')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  // 進行網址開頭是否為http://||https://的判斷
  if (!tryHttp(req.body.url)) {
    return res.render('fail')
  }

  ShortUrl.findOne({ originUrl: req.body.url })
    .then((data) => {
      // 如果資料庫有找到相同的原網址便導向抓出該短網址傳給使用者端
      if (data) {
        console.log('URL exist already:', data.shortUrl)
        res.render('success', { shortUrl: data.shortUrl })
        // 如果資料庫沒有找到相同的原網址便進行新增短網址的動作，會在generShortUrl進行驗證是否有重複
      } else {
        // 回傳Promise[pending]用async,await的方式接收，會直接轉變為 字串(短網址)，就能直接接收查詢。
        create()
        async function create() {
          const shortUrl = await generateShortUrl()
          ShortUrl.create({ shortUrl, originUrl: req.body.url })
            .then(console.log('create new one URL:', shortUrl))
            .then(() => res.render('success', { shortUrl }))
            .catch(error => console.log(error))
        }
        //try catch 寫法
        // try {
        //   const shortUrl = await generateShortUrl()
        //   const url = ShortUrl.create({ shortUrl, originUrl: req.body.url })
        //   if (url) {
        //     console.log('create new one URL:', shortUrl)
        //     res.render('success', { shortUrl })
        //   }
        // } catch (error) {
        //   console.log(error)
        // }
        // ===
        // create()
        // function parameterWhile(shortUrl) {
        //   ShortUrl.find({ shortUrl: shortUrl })
        //     .then(data => {
        //       console.log('oo', data)
        //       if (data[0].shortUrl == shortUrl) {
        //         console.log('true')
        //         return 'true'
        //       }
        //       else {
        //         return 'false'
        //       }
        //     })
        //     .catch(error => console.log(error))
        // }
        // console.log('parameteBoolean0', parameterWhile(hhghh))
        // async function create() {
        //   let shortUrl = await generateShortUrl()
        //   console.log('shortUrlL', shortUrl)
        //   let parameteBoolean = await parameterWhile(shortUrl)
        //   console.log('parameteBoolean', parameteBoolean)
        // while (parameteBoolean) {
        //   console.log('while loop')
        //   shortUrl = generateShortUrl()
        //   parameterWhile(shortUrl)
        // }
        // }
      }
    })
    .catch(error => console.log(error))
})

// 使用者輸入短網址後跳轉原網址
router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  ShortUrl.findOne({ shortUrl })
    .lean()
    .then((data) => {
      if (shortUrl !== 'favicon.ico') {
        return res.redirect(data.originUrl)
      }
    })
    .catch(error => console.log(error))
})

module.exports = router
