import User from '../config/Models/User.js'
import service from '../config/Models/service.js'
import appointment from '../config/Models/appointment.js'

export const countAllDocuments = async (req, res) => {
  try {
    const userCount = await User.countDocuments()
    const serviceCount = await service.countDocuments()
    const appointmentCount = await appointment.countDocuments()
    const appointmentsInProgress = await appointment.countDocuments({ status: 'En espera' })
    const completedAppointments = await appointment.countDocuments({ status: 'Realizada' })
    const canceledAppointments = await appointment.countDocuments({ status: 'Cancelada' })

    res.status(200).json({
      userCount,
      serviceCount,
      appointmentCount,
      appointmentsInProgress,
      completedAppointments,
      canceledAppointments
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
