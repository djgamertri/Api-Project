import Service from '../config/Models/service.js'

export const GetAll = async (req, res) => {
  try {
    const Services = await Service.find()
    res.json(Services)
  } catch (error) {
    console.error('Error al obtener los services:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GetOne = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    res.json(service)
  } catch (error) {
    console.error('Error al obtener los service:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const NewService = async (req, res) => {
  try {
    const { title, description, price, TimeAprox } = req.body
    const service = new Service({
      title,
      description,
      price,
      TimeAprox
    })
    const newService = await service.save()
    res.status(201).json(newService)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const Short = async (req, res) => {
  try {
    const buys = await Service.find().sort({ price: 1 })
    return res.status(201).json(buys)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const ShortTime = async (req, res) => {
  try {
    const buys = await Service.find({ TimeAprox: { $gt: 20 } })
    return res.json({
      succes: true,
      data: buys
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const UpdateService = async (req, res) => {
  try {
    const { title, description, price, TimeAprox } = req.body
    await Service.findByIdAndUpdate(
      { _id: req.params.id },
      { title, description, price, TimeAprox },
      { new: true }
    )
    res.json({ message: 'Service Updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const DeleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted Service' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
