const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
