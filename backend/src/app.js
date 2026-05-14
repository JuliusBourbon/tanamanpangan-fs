require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/auth')
const classifyRoutes = require('./routes/classify')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/auth', authRoutes)
app.use('/api/classify', classifyRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'WORKED!' })
})

// Multer error handler
app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Ukuran file terlalu besar. Maksimal 5MB.' })
  }
  if (err.message?.includes('Format file tidak didukung')) {
    return res.status(400).json({ message: err.message })
  }
  console.error(err.stack)
  return res.status(500).json({ message: 'Terjadi kesalahan server.' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})