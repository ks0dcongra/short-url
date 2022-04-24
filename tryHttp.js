// 判斷輸入的開頭是否為http:// 或 https://

function tryHttp (data) {
  const regExp = '^http\:\/\/|https\:\/\/'
  const result = data.match(regExp)
  if (!result) {
    return false
  } else {
    return true
  }
}

module.exports = tryHttp
