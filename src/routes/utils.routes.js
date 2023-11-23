import { Router } from 'express'
import { countAllDocuments } from '../controllers/utils.controller.js'

const router = Router()

router.get('/count', countAllDocuments)

export default router
