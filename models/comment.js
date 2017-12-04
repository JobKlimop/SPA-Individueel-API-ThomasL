const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema ({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comment: {
        type: String,
        require: true
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;