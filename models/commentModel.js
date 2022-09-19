const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    }
}, {timestamps: true})

const Comment = mongoose.model('Comments', commentSchema)

module.exports = Comment;