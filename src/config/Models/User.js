import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ['doctor', 'patient'],
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('User', UserSchema)
