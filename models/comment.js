const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema ({
    comment: {
        type: String,
        require: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;