const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 輸入相同網址時，產生一樣的縮址。(後端)
const shortUrlSchema = new Schema({
  originUrl: { type: String, required: true },
  shortUrl: { type: String, required: true }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
