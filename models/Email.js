const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String
});



mongoose.model('emails', emailSchema);

