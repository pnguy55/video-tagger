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
    _user: { type: Schema.Types.ObjectId, ref: 'User' 
    },
    dateCreated: Date
});


mongoose.model('tagLists', tagListSchema);

