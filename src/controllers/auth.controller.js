import User from '../config/Models/User.js'
import Agenda from '../config/Models/agenda.js'

export const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res.status(400).json({
        message: 'User not found'
      })
    }

    if (password !== userFound.password) {
      return res.status(400).json({
        message: 'Incorrect password'
      })
    }

    return res.json({
      succes: true,
      data: userFound
    })
  } catch (error) {
    console.error('Error al obtener los users:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const Register = async (req, res) => {
  let { name, email, role, password } = req.body
  const userFound = await User.findOne({ email })
  if (userFound) {
    return res.status(400).json({
      message: 'Email already registered'
    })
  }
  try {
    if (role === null || role !== ('Doctor' || 'Patient')) {
      role = 'Patient'
    }

    const user = new User({
      name,
      email,
      role,
      password
    })

    if (role === 'Doctor') {
      const newAgenda = new Agenda({
        doctor: {
          id: user._id,
          name: user.name
        }
      })

      await newAgenda.save()
    }

    console.log(user)
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error al obtener los users:', error)
    res.status(500).json({ message: error.message })
  }
}
