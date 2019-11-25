const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

userSchema.virtual('tagLists', {
    ref: 'TagList',
    localField: '_id',
    foreignField: 'owner'
})

mongoose.model('users', userSchema);

