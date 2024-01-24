const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    univName:String,
    Bio:String,
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

userSchema.plugin(passportLocalMongoose);
// login stuff
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, username: this.username, role: this.role }, 'jontyrhodes', {
        expiresIn: '1h',
    });
    return token;
};
userSchema.methods.isValidPassword = function (password) {
    return this.authenticate(password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;