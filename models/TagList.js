const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
}, {
    timestamps: true
});


mongoose.model('users', tagListSchema);

