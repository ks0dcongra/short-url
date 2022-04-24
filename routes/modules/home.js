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
  // 將資料變成陣列，陣列裡有字串
  let shortUrl = generateShortUrl().split().map(Url => ({ shortUrl: Url }))
  let shortUrl2 = shortUrl[0].shortUrl
  const originUrl = req.body.url.split().map(Url => ({ originUrl: Url }))
  const originUrl2 = originUrl[0].originUrl
  // 連接前處理完的陣列
  const arrUrl = originUrl.concat(shortUrl)
  // 整合成物件，以便資料庫建立(Create)的時候可以使用
  const objectUrl = Object.assign({}, ...arrUrl)
  // 宣告陣列，當創建完資料後會將陣列存入資料庫，當要進行網址是否有重複的判斷時，會將資料庫最近一筆的陣列抓下來尋覽是否有重複。
  const arrExist = []

  // 進行網址開頭是否為http://||https://的判斷
  if (!tryHttp(originUrl2)) {
    return res.redirect('/')
  }
  // 先判斷資料庫是否有重複的網址如果有的話就在進行一次生成短網址的動作
  ShortUrl.find({})
    // 避免短網址重複，只抓最新的一筆
    .sort({ _id: -1 })
    .limit(1)
    // 印出最新第一筆的儲存短網址物件
    .then((data) => {
      // 判斷現在資料庫有沒有資料
      if (Object.keys(data).length === 0) {
        console.log('first add URL in mongoose')
        arrExist.push(shortUrl2)
        objectUrl.arrExist = arrExist
      } else { // 如果從資料庫找出已有重複的短網址便再生呼叫generateShortUrl()生成一次短網址
        data = data[0]
        while (data.arrExist.some((n) => n === shortUrl2)) {
          console.log('RandomCode exist already:', data.arrExist.some((n) => n === shortUrl2))
          shortUrl = generateShortUrl().split().map(Url => ({ shortUrl: Url }))
          shortUrl2 = shortUrl[0].shortUrl
        }
        data.arrExist.push(shortUrl2)
        objectUrl.arrExist = data.arrExist
      }
    })

  // 輸入相同網址時，產生一樣的短網址。
  ShortUrl.findOne({ originUrl: originUrl2 })
    .then((data) => {
      // 如果資料庫有找到相同的原網址便導向抓出該短網址傳給使用者端
      if (data) {
        console.log('URL exist already:', data.shortUrl)
        res.render('success', { shortUrl: data.shortUrl })
      } else { // 如果資料庫沒有找到相同的原網址便新增先前組織好的物件並將第一次生成的短網址傳給使用者端
        return ShortUrl.create(objectUrl)
          .then(console.log('create new one URL:', shortUrl2))
          .then(() => res.render('success', { shortUrl: shortUrl2 }))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})

module.exports = router
