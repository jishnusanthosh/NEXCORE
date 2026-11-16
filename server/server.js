
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}))

app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to NEXCORE API'
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NEXCORE backend is running successfully',
    environment: process.env.NODE_ENV || 'development'
  })
})

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`NEXCORE server running on port ${PORT}`)
})
