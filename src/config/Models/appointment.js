import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true
  },
  doctor: {
    type: String,
    require: true
  },
  patient: {
    type: String,
    require: true
  },
  service: {
    type: Array,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Appointment', appointmentSchema)
