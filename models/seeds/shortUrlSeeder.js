const ShortUrl = require('../shortUrl')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connection!')
  for (let i = 0; i < 10; i++) {
    ShortUrl.create({ originUrl: `name-${i}` })
    ShortUrl.create({ shortUrl: `value-${i}` })
  }
  console.log('done')
})
