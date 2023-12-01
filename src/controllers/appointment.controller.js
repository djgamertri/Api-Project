import User from '../config/Models/User.js'
import Agenda from '../config/Models/agenda.js'
import Appointment from '../config/Models/appointment.js'
import Service from '../config/Models/service.js'

const calculateEndDate = (dateStart, totalDuration) => {
  if (!dateStart || isNaN(new Date(dateStart).getTime())) {
    throw new Error('Invalid dateStart')
  }
  if (typeof totalDuration !== 'number' || isNaN(totalDuration) || totalDuration < 0) {
    throw new Error('Invalid totalDuration')
  }
  let endDate = new Date(dateStart)
  endDate = new Date(endDate.getTime() + totalDuration * 60000)
  if (isNaN(endDate.getTime())) {
    throw new Error('Invalid endDate')
  }

  return endDate
}

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
    const appointmentId = req.params.id
    const appointment = await Appointment.findOne({ _id: appointmentId })

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' })
    }

    res.json(appointment)
  } catch (error) {
    console.error('Error al obtener la cita:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOneByDoctor = async (req, res) => {
  try {
    const Doctor = req.params.id
    const appointment = await Appointment.find({ 'doctor.id': Doctor })
    res.json(appointment)
  } catch (error) {
    console.error('Error al obtener los appointment:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOneByPatient = async (req, res) => {
  try {
    const patient = req.params.id
    const appointment = await Appointment.find({ 'patient.id': patient })
    res.json(appointment)
  } catch (error) {
    console.error('Error al obtener los appointment:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const NewAppointment = async (req, res) => {
  const { dateStart, doctor, patient, service } = req.body
  try {
    const foundService = await Service.findById(service)
    const foundDoctor = await User.findById(doctor)
    const foundPatient = await User.findById(patient)

    if (!doctor || !patient) {
      return res.status(404).json({ message: 'Doctor o paciente no encontrado' })
    }

    const dateEnd = calculateEndDate(dateStart, foundService.TimeAprox)

    const existingAppointment = await Appointment.findOne({
      'doctor.id': doctor,
      $or: [
        {
          dateStart: { $gte: dateStart, $lt: dateEnd }
        },
        {
          dateEnd: { $gt: dateStart, $lte: dateEnd }
        }
      ]
    })

    if (existingAppointment) {
      return res.status(500).json({ message: 'Ya hay una cita asignada en ese horario para ese doctor' })
    }

    const appointment = new Appointment({
      dateStart,
      dateEnd,
      doctor: { id: doctor, name: foundDoctor.name },
      patient: { id: patient, name: foundPatient.name },
      service
    })

    console.log(appointment)

    const newAppointment = await appointment.save()

    await Agenda.agregarCitaADoctor(doctor, newAppointment._id)

    res.status(201).json(newAppointment)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const UpdateAppointment = async (req, res) => {
  try {
    const { dateStart, doctor, patient, service, status } = req.body
    const foundService = await Service.findById(service)

    if (!doctor || !patient) {
      return res.status(404).json({ message: 'Doctor o paciente no encontrado' })
    }

    const dateEnd = calculateEndDate(dateStart, foundService.TimeAprox)

    const existingAppointment = await Appointment.findOne({
      'doctor.id': doctor.id,
      $or: [
        {
          dateStart: { $gte: dateStart, $lt: dateEnd }
        },
        {
          dateEnd: { $gt: dateStart, $lte: dateEnd }
        }
      ]
    })

    if (existingAppointment) {
      return res.status(500).json({ message: 'Ya hay una cita asignada en ese horario para ese doctor' })
    }

    await Appointment.findByIdAndUpdate(
      { _id: req.params.id },
      { dateStart, doctor, patient, service, status, dateEnd },
      { new: true }
    )
    res.json({ message: 'Appointment Updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const UpdateAppointmentStatus = async (req, res) => {
  try {
    const { newStatus } = req.body

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { status: newStatus } },
      { new: true }
    )

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Cita no encontrada' })
    }

    if (newStatus === 'Cancelada' || newStatus === 'Realizada') {
      await Agenda.eliminarCitaDeDoctor(updatedAppointment.doctor.id, updatedAppointment._id)
    }

    res.status(200).json(updatedAppointment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el estado de la cita' })
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
