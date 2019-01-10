let http = require('http')
let chalk = require('chalk')
let url = require('url')
let path = require('path')
let fs = require('mz/fs')
let mime = require('mime')
let ejs = require('ejs')
let zlib = require('zlib')

let tplStr = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')
// let s = ejs.render(tplStr, {
//     name: 'lyy',
//     arr: [1,2,3]
// })
class Server {
    constructor (config) {
        this.port = config.port
        this.address = config.address
        this.dir = config.dir           // 表示当前启动的目录 / 手动指定
        this.tpl = tplStr
    }
    // 处理请求的方法
    async handleRequest (req, res) {
        // Gzip压缩、范围请求、缓存

        // 1、文件的话显示文件内容 readFile
        // 2、文件夹的话显示目录 readDir

        // 模板渲染

        // 需要判断当前请求的内容是文件还是文件夹
        let {pathname} = url.parse(req.url)
        pathname = decodeURI(pathname)
        let realPath = path.join(this.dir, pathname)
        try {
            let statObj = await fs.stat(realPath)
            if (statObj.isFile()) {
                // 文件操作
                this.sendFile(req, res, realPath, statObj)
            } else {
                // 目录操作
                // ejs 和 html 很像
                let dirs = await fs.readdir(realPath)
                dirs = dirs.map(dir => {
                    return {
                        url: path.join(pathname, dir),
                        dir
                    }
                })
                // 渲染页面
                // dirs 包含当前点击的链接，和显示的路径
                let renderStr = ejs.render(this.tpl, {dirs})
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(renderStr)
            }
        } catch (e) {
            this.sendError(e, res)
        }
    }
    cache(req, res, path, statObj) {
        let ctime = statObj.ctime.toLocaleString()
        let etag = ctime + '_' + statObj.size
        // 强缓存
        res.setHeader('Cache-Control', 'max-age=5')
        res.setHeader('Expires', new Date(Date.now() + 5 * 1000).toLocaleString())
        res.setHeader('Last-Modified', ctime)
        // 不读文件，使用文件创建时间和文件大小，做判断
        res.setHeader('Etag', etag)
        // 协商缓存
        let ifModifiedSince = req.headers['if-modified-since']
        let ifNoneMatch = req.headers['if-none-match']
        if (ifModifiedSince && ifNoneMatch) {
            if (ifModifiedSince === ctime && ifNoneMatch === etag) {
                return true
            }
            return false
        } else {
            return false
        }
    }
    gzip (req, res) {
        let encoding = req.headers['accept-encoding']
        if (encoding.includes('gzip')) {
            // 返回 Content-Encoding，要不然浏览器不认识
            res.setHeader('Content-Encoding', 'gzip')
            return zlib.createGzip()
        }
        if (encoding.includes('deflate')) {
            // 返回 Content-Encoding，要不然浏览器不认识
            res.setHeader('Content-Encoding', 'deflate')
            return zlib.createDeflate
        }
        return false
    }
    sendFile (req, res, path, statObj) {
        // 先判断有没有缓存，有缓存走缓存，没缓存压缩
        if (this.cache(req, res, path, statObj)) {
            return res.statusCode = 304, res.end()
        }

        res.setHeader('Content-Type', mime.getType(path) + ';charset=utf-8')
        // gzip 压缩（可读流、可写流、双工流、转化流）
        // Accept-Encoding: gzip, deflate, br

        // 返回的文件，需要先压缩
        let zip
        if (zip = this.gzip(req, res)) {
            // 调用方法后返回的是一个转化流
            return fs.createReadStream(path).pipe(zip).pipe(res)
        }

        fs.createReadStream(path).pipe(res)
    }
    sendError (e, res) {
        console.log(e)
        res.statusCode = 404
        res.end('NOT FOUND')
    }
    start () {
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.port, this.address, () => {
            console.log(chalk.yellow.bgRed(`server start ${this.port}`))
            console.log(`http://${this.address}:${this.port}`)
        })
    }
}

module.exports = Server

