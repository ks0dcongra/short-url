const ShortUrl = require('../models/shortUrl')

// define sample function to randomly return an item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateShortUrl() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))
  let shortUrlRandomCode = ''
  for (let i = 0; i < 5; i++) {
    shortUrlRandomCode += String(sample(collection))
  }
  // 生成Url時就進行資料庫檢查，如果有找到一樣的短網址就重新生成
  const shortUrl = ShortUrl.find({ shortUrl: shortUrlRandomCode })
    .then((data) => {
      if (Object.keys(data).length !== 0) {
        return generateShortUrl()
      } else { // 如果沒有找到一樣的短網址就直接回傳Promis[pending]
        return shortUrlRandomCode
      }
    })

  return shortUrl
}
// 生成Url時就進行資料庫檢查，如果有找到一樣的短網址就重新生成
// const shortUrl = ShortUrl.find({ shortUrl: shortUrlRandomCode })
//   .then((data) => {
//     if (Object.keys(data).length !== 0) {
//       return generateShortUrl()
//     } else { // 如果沒有找到一樣的短網址就直接回傳Promis[pending]
//       return 'true'
//     }
//   })
// console.log(shortUrl)
// return 'aaaaa'
module.exports = generateShortUrl
