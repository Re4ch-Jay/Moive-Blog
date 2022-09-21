const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema =  mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema =  new Schema({
    email: {
        type: String,
        require: [true, "Please enter a an email"],
        unique: true,
        lowercase: true,
        validate:[isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        require: [true, "Please enter a password"],
        minlength: [6, "Minimum password is 6 characters"]
    },
}, {timestamps: true})

// mongoose hook 
// fire this function before the data save to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


// static method to login user by compare the password and email
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email}) // this. refer to User model
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error("incorrect password")
    }else{
        throw Error('incorrect email')
    }
}


const User = mongoose.model('User', userSchema);

module.exports = User;