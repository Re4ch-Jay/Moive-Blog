const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const PORT = 3000
const movieRoutes = require('./routes/movieRoutes')

// connect to database
const dbURI = "mongodb+srv://mongotut:testing123@cluster0.5arertl.mongodb.net/CompanyDB?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => {
        console.log('Server is running on port '+PORT)
        console.log('connected to the DB')
    }))
    .catch(err => console.log(err))

// midlleware 
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use((req, res, next) => next());


app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => res.render('index', {title: 'Home'}))
app.use(movieRoutes)

app.use((req, res) => {
    res.status(404).render('404', {title: "404"})
})


