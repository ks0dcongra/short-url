const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  originUrl: { type: String },
  shortUrl: { type: String }
})


module.exports = mongoose.model('ShortUrl', shortUrlSchema)