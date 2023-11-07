import { Router } from 'express'
import { GetAll, GetOne, DeleteUser, UpdateUser } from '../controllers/user.controller.js'

const router = Router()

router.get('/users', GetAll)

router.get('/users/:id', GetOne)

router.patch('/users/:id', UpdateUser)

router.delete('/users/:id', DeleteUser)

export default router
