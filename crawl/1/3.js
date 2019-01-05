// 复杂页面，使用 puppeteer 获取
let puppeteer = require('puppeteer')

(async () => {
    // 打开一个无界面的浏览器
    const browser = await puppeteer.launch()
    // 打开一个空的标签页
    const page = await browser.newPage()
    // 在地址栏中输入一个百度的地址
    await page.goto('http://www.baidu.com')
    // 把当前的页面进行截图，保存到 baidu.png 文件里
    await page.screenshot({path: 'baidu.png'})
    // 关闭浏览器
    await browser.close()
})()