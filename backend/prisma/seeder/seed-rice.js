const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

require('dotenv').config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

module.exports = prisma

const riceDiseases = [
  {
    name: 'Rice - Bacterial Blight',
    slug: 'rice-bacterial-blight',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    description: 'Penyakit bakteri paling serius pada tanaman padi yang dapat menyebabkan gagal panen hingga 75% jika tidak ditangani. Berkembang pesat pada kondisi lembap dan suhu hangat.',
    symptoms: 'Tepi daun menguning dan mengering dimulai dari ujung daun, menyebar sepanjang tepi daun membentuk garis bergelombang berwarna kuning hingga putih keabu-abuan. Pada serangan parah seluruh daun mengering dan tanaman tampak seperti terbakar. Pada pagi hari terdapat tetesan cairan bakteri berwarna kuning pada tepi daun yang terinfeksi.',
    treatment: 'Gunakan varietas padi tahan penyakit seperti IR64 atau Ciherang. Semprotkan bakterisida berbahan tembaga atau validamisin. Hindari pemupukan nitrogen berlebihan. Keringkan lahan secara berkala. Musnahkan sisa tanaman yang terinfeksi setelah panen.',
    imageUrl: null,
  },
  {
    name: 'Rice - Blast',
    slug: 'rice-blast',
    scientificName: 'Magnaporthe oryzae',
    description: 'Penyakit jamur paling merusak pada padi di seluruh dunia, dapat menyerang semua bagian tanaman di atas tanah pada semua fase pertumbuhan.',
    symptoms: 'Bercak berbentuk belah ketupat atau mata ikan berwarna abu-abu di bagian tengah dengan tepi coklat kemerahan pada daun. Pada leher malai terdapat bercak coklat kehitaman yang menyebabkan malai patah dan gabah hampa (blast leher). Bercak juga bisa muncul pada ruas batang dan cabang malai.',
    treatment: 'Semprotkan fungisida berbahan trisiklazol atau isoprothiolane saat gejala pertama muncul atau secara preventif. Gunakan varietas tahan blast. Hindari pemupukan nitrogen berlebihan yang membuat tanaman rentan. Atur jarak tanam agar sirkulasi udara baik.',
    imageUrl: null,
  },
  {
    name: 'Rice - Brown Spot',
    slug: 'rice-brown-spot',
    scientificName: 'Cochliobolus miyabeanus',
    description: 'Penyakit jamur yang sering dikaitkan dengan kondisi tanah miskin hara, terutama kekurangan kalium dan silika. Menjadi salah satu penyebab kelaparan Bengal pada tahun 1943.',
    symptoms: 'Bercak oval atau bulat berwarna coklat dengan pusat abu-abu atau putih pada daun, berukuran 0.5–1 cm. Bercak dikelilingi halo berwarna kuning. Pada serangan berat bercak-bercak menyatu dan daun mengering. Biji padi juga dapat terinfeksi sehingga menghasilkan gabah berwarna coklat dan berkualitas rendah.',
    treatment: 'Perbaiki kesuburan tanah dengan pemupukan kalium dan silika yang cukup. Semprotkan fungisida mankozeb atau propikonazol. Gunakan benih sehat yang bebas penyakit. Rendam benih dengan fungisida sebelum tanam sebagai tindakan preventif.',
    imageUrl: null,
  },
  {
    name: 'Rice - Tungro',
    slug: 'rice-tungro',
    scientificName: 'Rice Tungro Bacilliform Virus (RTBV) & Rice Tungro Spherical Virus (RTSV)',
    description: 'Penyakit virus yang ditularkan oleh wereng hijau (Nephotettix virescens) dan merupakan penyakit virus padi paling penting di Asia Tenggara termasuk Indonesia.',
    symptoms: 'Daun menguning atau mengoreng dimulai dari ujung daun pada tanaman muda. Tanaman tumbuh kerdil dengan anakan yang berkurang. Daun berwarna kuning oranye hingga kuning pucat. Pada infeksi parah tanaman tidak menghasilkan malai atau malai yang dihasilkan tidak berisi.',
    treatment: 'Tidak ada pengobatan untuk tanaman yang sudah terinfeksi. Kendalikan vektor wereng hijau dengan insektisida sistemik. Tanam serempak dalam satu hamparan untuk memutus siklus penyakit. Gunakan varietas tahan tungro. Cabut dan musnahkan tanaman yang terinfeksi sedini mungkin.',
    imageUrl: null,
  },
]

async function main() {
  console.log('🌾 Menambahkan data penyakit padi...\n')

  let created = 0
  let skipped = 0

  for (const disease of riceDiseases) {
    const existing = await prisma.disease.findUnique({
      where: { slug: disease.slug },
    })

    if (existing) {
      console.log(`⏭️  Skip (sudah ada): ${disease.name}`)
      skipped++
      continue
    }

    await prisma.disease.create({ data: disease })
    console.log(`✅ Berhasil: ${disease.name}`)
    created++
  }

  console.log('\n─────────────────────────────────')
  console.log(`✅ Selesai! ${created} data dibuat, ${skipped} data dilewati.`)
  console.log('─────────────────────────────────')
}

main()
  .catch((e) => {
    console.error('❌ Error saat seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })