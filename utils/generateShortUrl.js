// define sample function to randomly return an item in an array
function sample (array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateShortUrl () {
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
  return shortUrlRandomCode
}

module.exports = generateShortUrl
