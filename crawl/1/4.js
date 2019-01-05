let puppeteer = require('puppeteer')
let url = 'https://juejin.im/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F'

(async function () {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle2'})
    // 获取指定节点的属性，$相当于取一个 document.querySelector()，$$相当于取多个 document.querySelectorAll
    const titles = await page.$$eval('a.title', elements => elements.map(item => item.innerText))
    console.log(titles)
    browser.close()
})()