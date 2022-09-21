const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const movieRoutes = require('./routes/movieRoutes')
const authRoutes = require('./routes/authRoutes')
const {checkUser} = require('./middleware/authMiddleware')
const PORT = process.env.PORT
const cookieParser = require('cookie-parser')

// connect to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => {
        console.log('Server is running on port '+ PORT)
        console.log('connected to the DB')
    }))
    .catch(err => console.log(err))

// midlleware 

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// Routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('index', {title: 'Home'}))
app.use(movieRoutes)
app.use(authRoutes)


app.use((req, res) => {
    res.status(404).render('404', {title: "404"})
})


