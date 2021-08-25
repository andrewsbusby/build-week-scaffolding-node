const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const userRouter = require('./users/user-router');
const plantRouter = require('./plants/plant-router');
const authRouter = require('./auth/auth-router');





const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', userRouter)
server.use('/api/plants', plantRouter)
server.use('/api/auth', authRouter)

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = server
