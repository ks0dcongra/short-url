// define sample function to randomly return an item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
  // console.log(array[index])
  // console.log(Math.random() * array.length)
}
// sample(collection);

function generateShortUrl(shortURL) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))
  // console.log(collection)


  let shortUrlRandomCode = '';
  for (let i = 0; i < 5; i++) {
    shortUrlRandomCode += String(sample(collection))
    console.log(shortUrlRandomCode)
  }
  return shortUrlRandomCode
}

module.exports = generateShortUrl