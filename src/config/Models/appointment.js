import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const patientSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const appointmentSchema = new mongoose.Schema({
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date
  },
  doctor: doctorSchema,
  patient: patientSchema,
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Canceled'],
    default: 'En espera',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Appointment', appointmentSchema)
