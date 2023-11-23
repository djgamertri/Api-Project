import Agenda from '../config/Models/agenda.js'

export const GetAll = async (req, res) => {
  try {
    const agendas = await Agenda.find()
    res.json(agendas)
  } catch (error) {
    console.error('Error al obtener los agendas:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOne = async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id)
    res.json(agenda)
  } catch (error) {
    console.error('Error al obtener los agenda:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOneByDoctor = async (req, res) => {
  const doctor = req.params.id
  try {
    const agenda = await Agenda.find({ doctor })
    res.json(agenda)
  } catch (error) {
    console.error('Error al obtener los agenda:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOneByDoctorMin = async (req, res) => {
  const doctor = req.params.id
  try {
    const agenda = await Agenda.find({
      doctor,
      appointment: { $elemMatch: { $exists: true, $not: { $size: 2 } } }
    })
    res.json(agenda)
  } catch (error) {
    console.error('Error al obtener los agenda:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const NewAgenda = async (req, res) => {
  try {
    const { doctor, appointments } = req.body
    const agenda = new Agenda({
      doctor,
      appointments
    })
    const newAgenda = await agenda.save()

    for (const appointmentId of newAgenda.appointments) {
      await Agenda.agregarCitaADoctor(doctor.id, appointmentId)
    }

    res.status(201).json(newAgenda)
  } catch (error) {

  }
}

export const UpdateAgenda = async (req, res) => {
  const { doctor, appointment } = req.body
  try {
    await Agenda.findByIdAndUpdate(
      { _id: req.params.id },
      { doctor, appointment },
      { new: true }
    )
    res.json({ message: 'Agenda Updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const DeleteAgenda = async (req, res) => {
  try {
    await Agenda.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
