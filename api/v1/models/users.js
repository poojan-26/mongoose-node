const { now } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    fullname: String,
    address: String,
    city: String,
    gender: String,
    email: String,
    password: String,
    creationdate: {type: Date, default: Date.now},
    user_image: String,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);