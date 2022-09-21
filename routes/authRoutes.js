const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/signup', authController.get_signup)
router.get('/login', authController.get_login)
router.post('/signup', authController.post_signup)
router.post('/login', authController.post_login)
router.get('/logout', authController.get_logout)

module.exports = router;