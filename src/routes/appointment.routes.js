import { Router } from 'express'
import { GetAll, GetOne, NewAppointment, DeleteAppointment, UpdateAppointment, GetOneByPatient, UpdateAppointmentStatus } from '../controllers/appointment.controller.js'

const router = Router()

router.get('/appointments', GetAll)

router.get('/appointment/:id', GetOne)

router.get('/appointment/patient/:id', GetOneByPatient)

router.post('/appointment', NewAppointment)

router.patch('/appointmentStatus/:id', UpdateAppointmentStatus)

router.patch('/appointment/:id', UpdateAppointment)

router.delete('/appointment/:id', DeleteAppointment)

export default router
