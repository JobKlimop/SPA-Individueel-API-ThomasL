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
            name: String,
            required: true
        },
        description: String,
        uploadDate: {
            type: dateTime,
            required: true
        }
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;