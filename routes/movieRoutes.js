const express = require('express')
const router = express.Router()
const Movie = require('../models/movieModel')
const movieControllers = require('../controllers/movieControllers')
const {requireAuth} = require('../middleware/authMiddleware')

router.get('/movie', requireAuth , movieControllers.get_movie)

router.post('/movie', movieControllers.post_movie)

router.get('/movie/create', requireAuth, movieControllers.get_create_movie)

router.get('/movie/:id', movieControllers.get_single_movie)

router.delete('/movie/:id', movieControllers.delete_movie)

module.exports = router;