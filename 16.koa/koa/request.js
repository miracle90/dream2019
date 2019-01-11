let request = {
    // 属性的访问器，Object.defineProperty({get})
    get url () {
        // this 指向 ctx.request
        return this.req.url
    }
}

// console.log(request.url)

module.exports = request