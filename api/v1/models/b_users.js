const mongoose = require('mongoose');

const b_usersSchema = mongoose.Schema({
    name: String,
    month: Array, 
    
    // is_active:  { type: Boolean, default: false },
    // is_verified:  { type: Boolean, default: false },
    // is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('b_users', b_usersSchema);