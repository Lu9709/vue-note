const fs = require('fs')
const path = require('path')

const mockBaseURL = 'https://localhost:8080'
const realBaseURL = 'https://note-server.hunger-valley.com'

exports.config = function ({isDev = true} = {isDev: true}) {
  // 传入一个参数 若是没有默认参数则为 true
  let fileTxt = `
    module.exports = {
      baseURL:"${isDev ? mockBaseURL : realBaseURL}"
    }
    `
  fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'), fileTxt)
  //__dirname 指的是绝对路径 join是两个路径的拼接 resolve 中会被解析为根目录
}
