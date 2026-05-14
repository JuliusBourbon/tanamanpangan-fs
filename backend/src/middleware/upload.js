const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Check uploads folder
const uploadDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const userId = req.user?.userId ?? 'unknown'
        const timestamp = Date.now()
        const ext = path.extname(file.originalname).toLowerCase()
        cb(null, `${userId}_${timestamp}${ext}`)
    },
})

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Format file tidak didukung. Gunakan JPG, PNG, atau WebP.'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})

module.exports = upload