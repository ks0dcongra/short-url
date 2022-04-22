const mongoose = require('mongoose')
const ShortUrl = require('../shortUrl')

mongoose.connect('mongodb+srv://alpha:camp@cluster0.ctbuq.mongodb.net/todo-list?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connection!')
  for (let i = 0; i < 10; i++) {
    ShortUrl.create({ name: `name-${i}` })
  }
  console.log('done')
})