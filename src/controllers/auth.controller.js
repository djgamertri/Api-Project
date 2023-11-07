import User from '../config/Models/User.js'

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
  const { name, email, role, password } = req.body
  try {
    const user = new User({
      name,
      email,
      role,
      password
    })
    console.log(user)
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error al obtener los users:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}
