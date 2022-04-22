const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  originUrl: { type: String, required: true },
  shortUrl: { type: String, required: true }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
