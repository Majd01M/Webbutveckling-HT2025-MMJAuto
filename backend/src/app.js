// backend/src/app.js
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { connectDB } from './config/db.js'

// Routes (MVC)
import authRoutes from './routes/authRoutes.js'
import partRoutes from './routes/partRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

const app = express()

// --- Connect to MongoDB (Data persistence ✅) ---
connectDB()

// --- Security & middleware ---
app.use(helmet())

// Allow multiple frontend origins via env: CLIENT_URL="http://localhost:5500,http://127.0.0.1:5500"
const allowedOrigins = (process.env.CLIENT_URL || '*').split(',').map(s => s.trim())
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
)

app.use(express.json())
app.use(morgan('dev'))

// --- Health check ---
app.get('/', (req, res) => res.json({ ok: true, name: 'MMJAuto API' }))

// --- API routes ---
app.use('/api/auth', authRoutes)                 // register/login/me
app.use('/api/parts', partRoutes)                // catalog + admin CRUD
app.use('/api/wishlist', wishlistRoutes)         // per-user wishlist
app.use('/api/notifications', notificationRoutes) // list + mark read

// --- 404 handler ---
app.use((req, res) => res.status(404).json({ message: 'Not found' }))

// --- Error handler ---
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

export default app
