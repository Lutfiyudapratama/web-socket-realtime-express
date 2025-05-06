const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const studentRoutes = require('./routes/studentRoutes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3001
const hostName = "127.0.0.1"

app.use('/v1/auth', authRoutes(express))
app.use('/v1/student', studentRoutes(express))

app.get('/', (req, res) => {
    res.send({
        message: 'Home Page'
    })
})

app.listen(port, () => console.log(`Server running at http://${hostName}:${port}`))



// const { createServer } = require('http')

// const hostName = '127.0.0.1'
// const port = 3000

// const server = createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plan')
//     res.end("Hello Dunia!!")
// })

// server.listen(port, hostName, () => {
//     console.log(`Server running at http://${hostName}:${port}`)
// })