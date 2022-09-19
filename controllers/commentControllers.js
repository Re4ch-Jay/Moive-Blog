const Comment = require('../models/commentModel')

const get_comment = (req, res) => {
    Comment.find()
        .then(result => res.render('comments', {title: "Comment", comments: result}))
        .catch(err => console.log(err))
}

const post_comment = (req, res) => {
    console.log(req.body)
    const comment = new Comment(req.body)
    comment.save()
        .then(result => res.redirect('comments'))
        .catch(err => console.log(err))
}

const delete_comment = (req, res) => {
    const id = req.params.id
    Comment.findByIdAndDelete(id)
        .then(result => res.redirect('comments'))
        .catch(err => console.log(err))
}

module.exports = {
    get_comment,
    post_comment,
    delete_comment,
}