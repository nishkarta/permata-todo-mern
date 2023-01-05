require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const categoryRoutes = require('./routes/categories')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/categories', categoryRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch(err => console.log(err))


