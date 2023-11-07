import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3001
export const MongoDB = process.env.MONGO_DB || ''
