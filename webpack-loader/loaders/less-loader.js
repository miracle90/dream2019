let less = require('less')

function loader(source) {
    let css
    less.render(source, function (err, res) {       // res.css就是转化的结果
        css = res.css
    })
    return css
}

module.exports = loader