import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  }
})

const agendaSchema = new mongoose.Schema({
  doctor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  appointments: [appointmentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

agendaSchema.statics.agregarCitaADoctor = async function (doctorId, appointmentId) {
  console.log(doctorId)
  console.log(appointmentId)

  const agenda = await this.findOne({ 'doctor.id': doctorId })
  if (agenda) {
    agenda.appointments.push({ id: appointmentId })
    return agenda.save()
  }
  throw new Error('Agenda no encontrada para el doctor')
}

agendaSchema.statics.eliminarCitaDeDoctor = async function (doctorId, appointmentId) {
  const agenda = await this.findOne({ 'doctor.id': doctorId })
  if (agenda) {
    agenda.appointments = agenda.appointments.filter(appointment => String(appointment.id) !== String(appointmentId))
    return agenda.save()
  }
  throw new Error('Agenda no encontrada para el doctor')
}

export default mongoose.model('Agenda', agendaSchema)
