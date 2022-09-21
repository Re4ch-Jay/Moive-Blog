const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: "", password: ""}
    // incorrect email
    if(err.message === "incorrect email"){
        errors.email = 'That email is not register'
    }

    if(err.message === "incorrect password"){
        errors.password = 'That password is incorrect'
    }

    if(err.code === 11000){
        errors.email = "That email is already existed"
        return errors
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}

// create token
const AGE = 3 * 25 * 60 * 60; // 3 days
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_TOKEN, {
        expiresIn: AGE //seconds
    })
}


const get_signup = (req, res) => {
    res.render("auth/signup", {title: "Sign Up"})
}

const get_login = (req, res) => {
    res.render("auth/login", {title: "Login"})
}

const post_signup = async (req, res) => {

    const {email, password} = req.body
    try {
        const user = await User.create({email, password})
        // jwt for login user
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: AGE * 1000})
        // ......
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}   

const post_login = async (req, res) => {
    console.log(req.body)
    
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        // jwt for login user
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: AGE * 1000})
        // ......
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

// delete token to logout
const get_logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}

module.exports = {
    get_signup,
    get_login,
    post_signup,
    post_login,
    get_logout
}