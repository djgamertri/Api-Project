import { Router } from 'express'
import { GetAll, GetOne, NewAppointment, DeleteAppointment, UpdateAppointment, GetOneByPatient } from '../controllers/appointment.controller.js'

const router = Router()

router.get('/appointments', GetAll)

router.get('/appointment/:id', GetOne)

router.get('/appointment/patient/:id', GetOneByPatient)

router.post('/appointments', NewAppointment)

router.patch('/appointment/:id', UpdateAppointment)

router.delete('/appointment/:id', DeleteAppointment)

export default router
