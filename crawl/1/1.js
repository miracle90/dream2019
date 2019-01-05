/**
 * 如果说这个网站提供了API接口，那么直接读取接口内容，得到数据
 */

let axios = require('axios')
let url = 'https://follow-api-ms.juejin.im/v1/getUserFollowInfo?uid=576b433bd342d30057aaa1e9&src=web'

(async function () {
    let res = await axios.get(url)
    console.log(res)
})()
