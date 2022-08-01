const express = require('express')
const db = require('./database/db.connection')
const placeService = require('./routes/place.service')

db.authenticate().then(() => {
    console.log('Database connected successfully!')
}).catch((err) => {
    console.log(err)
})

const placeLocator = express()

placeLocator.use(express.json())
placeLocator.use(placeService)

const port = process.env.PORT

placeLocator.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})