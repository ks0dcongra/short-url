const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  originUrl: { type: String },
  shortUrl: { type: String },
  arrExist: { type: Array }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
