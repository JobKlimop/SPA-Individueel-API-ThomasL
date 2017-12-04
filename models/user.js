const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    images: [ImageSchema],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;