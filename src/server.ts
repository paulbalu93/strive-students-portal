import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
import listEndpoints from 'express-list-endpoints'

dotenv.config()

const server = express()
const port = process.env.PORT

// MIDDLEWARES

server.use(cors())
server.use(express.json())

//ROUTES


//ERROR HANDLERS

mongoose.connect(process.env.MONGO_CONNECTION!, {useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on("connected",() => {
    console.log("mongoose connected")
    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log("server is running on port", port)
    })

})