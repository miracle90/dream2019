let express = require('express')
let cors = require('cors')

let app = express()

app.use(cors())
app.get('/amount', function(req, res) {
    let num = Math.floor(10 * Math.random()).toString()
    res.json({
        code: 0,
        data: num
    })
})

app.listen(3000)