const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    doctorSpecialization: String,
    doctorId: String,
    userId: String,
    consultancyFees: Number,
    appointmentDate: String,
    appointmentTime: String,
    creationdate: Date,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('appointment', AppointmentSchema);