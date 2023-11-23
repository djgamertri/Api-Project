import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['Doctor', 'Patient'],
    default: 'Patient',
    require: true
  },
  password: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('User', UserSchema)
