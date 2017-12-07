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
        description: String,
        uploadDate: {
            type: Date,
            required: true
        }
    }],
    likes: {
        type: Number,
        require: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        required: false
    }]
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;