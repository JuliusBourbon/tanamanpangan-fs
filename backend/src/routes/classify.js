const express = require('express')
const path = require('path')
const fs = require('fs')
const prisma = require('../config/prisma')
const authenticate = require('../middleware/auth')
const upload = require('../middleware/upload')

const router = express.Router()

// HELPER -> Deleting upload file when Error
const deleteFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}

// CLASSIFIER (Dummy)
async function classifyImage(imagePath) {
    const diseases = await prisma.disease.findMany({ select: { slug: true } })
    const random = diseases[Math.floor(Math.random() * diseases.length)]
    return {
        slug: random.slug,
        confidenceScore: parseFloat((Math.random() * 0.4 + 0.6).toFixed(4)), // 0.6 – 1.0
    }
}

// POST /api/classify
router.post('/', authenticate, upload.single('image'), async (req, res) => {
    // Validasi file
    if (!req.file) {
        return res.status(400).json({ message: 'Gambar wajib diunggah.' })
    }

    const imagePath = req.file.path

    try {
        // Run classification
        const { slug, confidenceScore } = await classifyImage(imagePath)

        // Find disease based on classification result
        const disease = await prisma.disease.findUnique({ where: { slug } })
        if (!disease) {
            deleteFile(imagePath)
            return res.status(500).json({ message: 'Penyakit tidak ditemukan di database.' })
        }

        // Save result
        const classification = await prisma.classification.create({
            data: {
                userId: req.user.userId,
                diseaseId: disease.id,
                imageUrl: imagePath,
                confidenceScore,
            },
        })

        // Client Response
        return res.status(201).json({
            message: 'Klasifikasi berhasil',
            result: {
                classificationId: classification.id,
                disease: {
                name: disease.name,
                slug: disease.slug,
                scientificName: disease.scientificName,
                description: disease.description,
                symptoms: disease.symptoms,
                treatment: disease.treatment,
                },
                confidenceScore,
                imageUrl: imagePath,
                classifiedAt: classification.createdAt,
            },
        })
    } catch (error) {
        deleteFile(imagePath)
        console.error('Error saat klasifikasi:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan saat memproses gambar.' })
    }
})

// GET /api/classify/history
router.get('/history', authenticate, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const skip = (parseInt(page) - 1) * parseInt(limit)

        const [history, total] = await Promise.all([
            prisma.classification.findMany({
                where: { userId: req.user.userId },
                include: {
                    disease: {
                        select: {
                        name: true,
                        slug: true,
                        scientificName: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: parseInt(limit),
            }),
            prisma.classification.count({
                where: { userId: req.user.userId },
            }),
        ])

        return res.status(200).json({
            data: history,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        })
    } catch (error) {
        console.error('Error saat mengambil riwayat:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
})

// GET /api/classify/history/:id
router.get('/history/:id', authenticate, async (req, res) => {
    try {
        const classification = await prisma.classification.findFirst({
            where: {
                id: parseInt(req.params.id),
                userId: req.user.userId,
            },
            include: { disease: true },
        })

        if (!classification) {
            return res.status(404).json({ message: 'Data klasifikasi tidak ditemukan.' })
        }

        return res.status(200).json({ data: classification })
    } catch (error) {
        console.error('Error saat mengambil detail klasifikasi:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
})

// DELETE /api/classify/history/:id
router.delete('/history/:id', authenticate, async (req, res) => {
    try {
        const classification = await prisma.classification.findFirst({
            where: {
                id: parseInt(req.params.id),
                userId: req.user.userId,
            },
        })

        if (!classification) {
            return res.status(404).json({ message: 'Data klasifikasi tidak ditemukan.' })
        }

        deleteFile(classification.imageUrl)

        await prisma.classification.delete({ where: { id: classification.id } })

        return res.status(200).json({ message: 'Riwayat klasifikasi berhasil dihapus.' })
    } catch (error) {
        console.error('Error saat menghapus klasifikasi:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
})

// GET /api/diseases
router.get('/diseases', async (req, res) => {
    try {
        const diseases = await prisma.disease.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                scientificName: true,
                description: true,
            },
            orderBy: { name: 'asc' },
        })

        return res.status(200).json({ data: diseases })
    } catch (error) {
        console.error('Error saat mengambil daftar penyakit:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
})

module.exports = router