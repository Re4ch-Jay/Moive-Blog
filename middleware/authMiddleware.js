// custom middleware
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const requireAuth = (req, res, next) => {
    // get token
    const token = req.cookies.jwt
    // check jwt exists and verified
    if(token) {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
            if(err) {
                res.redirect('/login')
                console.log(err)
            }
            else{
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}


// check if user if login or not and show the welcome screen
const checkUser = (req, res, next) => {
    // get token
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
            if(err) {
                console.log(err)
                res.locals.user = null;
                next()
            }
            else{
                console.log(decodedToken)
                const user = await User.findById(decodedToken.id) // find user by id 
                res.locals.user = user; //get the res and send it to frontend
                next()
            }
        })
    }else{
        res.locals.user = null; 
        next()
    }
}


module.exports = {requireAuth, checkUser};