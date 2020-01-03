const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    email: String,
    yes: false,
    no: false
});



mongoose.model('users', userSchema);

