import { Router } from 'express'
import { GetAll, GetOne, NewService, DeleteService, UpdateService, ShortTime, Short } from '../controllers/service.controller.js'

const router = Router()

router.get('/service', GetAll)

router.get('/service/:id', GetOne)

router.get('/services/short', Short)

router.get('/services/Time', ShortTime)

router.post('/service', NewService)

router.patch('/service/:id', UpdateService)

router.delete('/service/:id', DeleteService)

export default router
