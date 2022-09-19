const Movie = require('../models/movieModel')

const get_movie = (req, res) => {
    Movie.find()
        .then(result => res.render('movies/movies', {title: "Movies", movies: result}))
        .catch(err => console.log(err))
}

const get_create_movie = (req, res) => {
    res.render('movies/create', {title: "Create"})
}

const post_movie = (req, res) => {
    console.log(req.body)
    const movie = new Movie(req.body)
    movie.save()
        .then(result => res.redirect('/movie'))
        .catch(err => console.log(err))
}

const get_single_movie = (req, res) => {
    const id = req.params.id
    Movie.findById(id)
        .then(result => res.render('movies/details', {title: "Details", movie: result}))
        .catch(err => {
            res.status(404).render('404', {title: "404"})
            console.log(err)
        })
}

const delete_movie = (req, res) => {
    const id = req.params.id
    Movie.findByIdAndDelete(id)
        .then(result => res.json({redirect: 'movies/movie'}))
        .catch(err => console.log(err))
}

module.exports = {
    get_movie,
    get_create_movie,
    post_movie,
    get_single_movie,
    delete_movie
}