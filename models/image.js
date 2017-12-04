const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: [{
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        description: String,
        uploadDate: {
            type: Date,
            required: true
        }
    }],
    likes: [{
        like: {
            type: Number,
            require: true
        },
        user: {
            type: Schema.Types.ObjectId,
            require: true
        }
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;