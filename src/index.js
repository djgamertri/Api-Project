import AuthRoutes from './routes/auth.routes.js'
import utilsRoutes from './routes/utils.routes.js'
import agendaRoutes from './routes/agenda.routes.js'
import appointmentRoutes from './routes/appointment.routes.js'
import serviceRoutes from './routes/service.routes.js'
import UserRoutes from './routes/users.routes.js'

import express from 'express'
import cors from 'cors'
import { MongoDB, PORT } from './config/Config.js'
import mongoose from 'mongoose'
import logger from 'morgan'

const app = express()

mongoose.connect(MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'))
db.once('open', () => {
  console.log('Conexión a MongoDB exitosa')
})

app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(AuthRoutes)
app.use(utilsRoutes)
app.use(agendaRoutes)
app.use(appointmentRoutes)
app.use(serviceRoutes)
app.use(UserRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'This page not found'
  })
})

app.listen(PORT)
