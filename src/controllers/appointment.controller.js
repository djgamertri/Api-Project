import Appointment from '../config/Models/appointment.js'

export const GetAll = async (req, res) => {
  try {
    const appointments = await Appointment.find()
    res.json(appointments)
  } catch (error) {
    console.error('Error al obtener los appointments:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOne = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
    res.json(appointment)
  } catch (error) {
    console.error('Error al obtener los appointment:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOneByPatient = async (req, res) => {
  try {
    const patient = req.params.id
    const appointment = await Appointment.find({ patient })
    res.json(appointment)
  } catch (error) {
    console.error('Error al obtener los appointment:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const NewAppointment = async (req, res) => {
  const { date, doctor, patient, service } = req.body
  try {
    const appointment = new Appointment({
      date,
      doctor,
      patient,
      service
    })
    const newAppointment = await appointment.save()
    res.status(201).json(newAppointment)
  } catch (error) {

  }
}

export const UpdateAppointment = async (req, res) => {
  try {
    const { date, doctor, patient, service } = req.body

    await Appointment.findByIdAndUpdate(
      { _id: req.params.id },
      { date, doctor, patient, service },
      { new: true }
    )
    res.json({ message: 'Appointment Updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const DeleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted Appointment' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
