import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  TimeAprox: {
    type: Number,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Service', serviceSchema)
