const express = require('express')
const { DeleteObjectCommand } = require('@aws-sdk/client-s3')
const prisma = require('../config/prisma')
const authenticate = require('../middleware/auth')
const { upload, s3 } = require('../middleware/upload')

const router = express.Router()

// HELPER: Delete file when Error
const deleteFromS3 = async (imageUrl) => {
    try {
        const url = new URL(imageUrl)
        const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname

        await s3.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        }))
    } catch (error) {
        console.error('Failed to deleting file from S3:', error)
    }
}

// DUMMY CLASSIFIER
async function classifyImage(imageUrl) {
    const diseases = await prisma.disease.findMany({ select: { slug: true } })
    const random = diseases[Math.floor(Math.random() * diseases.length)]
    return {
        slug: random.slug,
        confidenceScore: parseFloat((Math.random() * 0.4 + 0.6).toFixed(4)),
    }
}

// POST /api/classify
router.post('/', authenticate, upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Gambar wajib diunggah.' })
    }

    const imageUrl = req.file.location

    try {
        const { slug, confidenceScore } = await classifyImage(imageUrl)

        const disease = await prisma.disease.findUnique({ where: { slug } })
        if (!disease) {
            await deleteFromS3(imageUrl)
            return res.status(500).json({ message: 'Penyakit tidak ditemukan di database.' })
        }

        const classification = await prisma.classification.create({
            data: {
                userId: req.user.userId,
                diseaseId: disease.id,
                imageUrl,
                confidenceScore,
            },
        })

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
                imageUrl,
                classifiedAt: classification.createdAt,
            },
        })
    } catch (error) {
        await deleteFromS3(imageUrl)
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
                    select: { name: true, slug: true, scientificName: true },
                },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: parseInt(limit),
            }),
            prisma.classification.count({ where: { userId: req.user.userId } }),
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

        await Promise.all([
            deleteFromS3(classification.imageUrl),
            prisma.classification.delete({ where: { id: classification.id } }),
        ])

        return res.status(200).json({ message: 'Riwayat klasifikasi berhasil dihapus.' })
    } catch (error) {
        console.error('Error saat menghapus klasifikasi:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
})

module.exports = router