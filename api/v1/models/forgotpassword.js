const mongoose = require('mongoose');

const forgotpasswordSchema = mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    fullname: String,
    city: String,
    gender: String,
    email: String,
    password: String,
    resetLink:{
        data: String,
        default: ''
    },
    creationdate: Date,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    // timestamps: true
});

module.exports = mongoose.model('forgotpassword', forgotpasswordSchema);