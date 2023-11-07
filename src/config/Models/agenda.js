import mongoose from 'mongoose'

const agendaSchema = new mongoose.Schema({
  doctor: {
    type: String,
    require: true
  },
  appointment: {
    type: Array,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Agenda', agendaSchema)
