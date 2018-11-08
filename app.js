const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

//may need below later
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

app.use('/posts', require('./routes/posts'))

app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    res.status(status).send(err)
})

app.use((req, res, next) => {
    res.status(404).send('Nope. No such thing.')
})

const listener = () => console.log(`Getting down on port ${port}`)
app.listen(port, listener)

module.exports = app