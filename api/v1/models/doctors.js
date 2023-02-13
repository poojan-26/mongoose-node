const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    specilization: String,
    doctorName: String,
    address: String,
    docFees: String,
    contactno: Number,
    docEmail: String,
    password: String,
    doc_iamge: String,
    creationdate: Date,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', DoctorSchema);