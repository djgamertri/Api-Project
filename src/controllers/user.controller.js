import User from '../config/Models/User.js'

export const GetAll = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.error('Error al obtener los users:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOne = async (req, res) => {
  try {
    const users = await User.findById(req.params.id)
    res.json(users)
  } catch (error) {
    console.error('Error al obtener los bootcamps:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const UpdateUser = async (req, res) => {
  const { name, email, role, password } = req.body
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      { name, email, role, password },
      { new: true }
    )
    res.json({ message: 'User Updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
