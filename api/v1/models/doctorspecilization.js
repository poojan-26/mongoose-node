const mongoose = require('mongoose');

const DoctorspecilizationSchema = mongoose.Schema({
    specilization: String,
    creationdate: Date,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctorspe', DoctorspecilizationSchema);