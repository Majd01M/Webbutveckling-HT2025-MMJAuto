import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
connectDB()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || '*' }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => res.json({ msg: 'MMJAuto API is live 🚗' }))

app.use('/api/auth', authRoutes)

// 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }))

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

export default app
