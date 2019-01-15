let express = require('express')

let router = express.Router()

router.get('/add', function (req, res) {
    res.send('person add')
})

module.exports = router