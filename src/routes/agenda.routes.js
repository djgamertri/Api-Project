import { Router } from 'express'
import { GetAll, GetOne, NewAgenda, DeleteAgenda, UpdateAgenda, GetOneByDoctor, GetOneByDoctorMin } from '../controllers/agenda.controller.js'

const router = Router()

router.get('/agenda', GetAll)

router.get('/agenda/:id', GetOne)

router.get('/agenda/doctor/:id', GetOneByDoctor)

router.get('/agenda/doctor/min/:id', GetOneByDoctorMin)

router.post('/agenda', NewAgenda)

router.patch('/agenda/:id', UpdateAgenda)

router.delete('/agenda/:id', DeleteAgenda)

export default router
