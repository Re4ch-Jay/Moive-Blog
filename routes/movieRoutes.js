const express = require('express')
const router = express.Router()
const Movie = require('../models/movieModel')
const movieControllers = require('../controllers/movieControllers')

router.get('/movie', movieControllers.get_movie)

router.post('/movie', movieControllers.post_movie)

router.get('/movie/create', movieControllers.get_create_movie)

router.get('/movie/:id', movieControllers.get_single_movie)

router.delete('/movie/:id', movieControllers.delete_movie)

module.exports = router;