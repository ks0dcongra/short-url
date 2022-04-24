// 判斷輸入的開頭是否為http:// 或 https://
try {
  function tryHttp(data) {
    const regExp = '^http\:\/\/|https\:\/\/'
    const result = data.match(regExp)
    if (!result) {
      return false
    } else {
      return true
    }
  }
}
catch {
  console.log(Error)
}

module.exports = tryHttp
