const express = require('express')
const router = express.Router()
const Comment = require('../models/commentModel')
const commentControllers = require('../controllers/commentControllers')

router.get('/comments', commentControllers.get_comment)

router.post('/comments', commentControllers.post_comment)

router.get('/comments/:id', commentControllers.delete_comment)

router.delete('/comments/:id', commentControllers.delete_comment)

module.exports = router;