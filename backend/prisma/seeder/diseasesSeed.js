const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

require('dotenv').config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

module.exports = prisma

const diseases = [
  // ── Apple ──────────────────────────────────────────────────────────────────
  {
    name: 'Apple - Apple Scab',
    slug: 'apple-apple-scab',
    cropType: 'apple',
    scientificName: 'Venturia inaequalis',
    description: 'Penyakit jamur yang menyerang daun dan buah apel, menyebabkan bercak gelap bersisik yang merusak kualitas buah.',
    symptoms: 'Bercak gelap kecoklatan atau kehijauan pada permukaan daun dan buah. Daun yang terinfeksi berat dapat menggulung dan rontok lebih awal. Buah menunjukkan bercak berkoreng dan retak.',
    treatment: 'Semprotkan fungisida berbahan aktif kaptan atau mancozeb saat musim semi. Buang dan musnahkan daun-daun yang terinfeksi. Pangkas cabang agar sirkulasi udara baik. Tanam varietas tahan penyakit.',
    imageUrl: null,
  },
  {
    name: 'Apple - Black Rot',
    slug: 'apple-black-rot',
    cropType: 'apple',
    scientificName: 'Botryosphaeria obtusa',
    description: 'Penyakit jamur yang menyebabkan busuk buah dan bercak daun pada tanaman apel, terutama di musim panas yang hangat dan lembap.',
    symptoms: 'Bercak ungu kecil pada daun yang melebar menjadi coklat dengan tepi ungu. Buah menunjukkan busuk hitam yang meluas dari kelopak. Kulit cabang terlihat melepuh dan berwarna coklat kemerahan.',
    treatment: 'Pangkas dan musnahkan kayu yang terinfeksi. Semprotkan fungisida kaptan atau tembaga. Buang buah-buah yang terinfeksi dari pohon maupun yang jatuh ke tanah. Hindari luka pada kulit pohon.',
    imageUrl: null,
  },
  {
    name: 'Apple - Cedar Apple Rust',
    slug: 'apple-cedar-apple-rust',
    cropType: 'apple',
    scientificName: 'Gymnosporangium juniperi-virginianae',
    description: 'Penyakit jamur yang membutuhkan dua inang (apel dan cedar/juniper) untuk menyelesaikan siklus hidupnya.',
    symptoms: 'Bercak kuning-oranye cerah pada permukaan atas daun apel. Sisi bawah daun menunjukkan struktur berbentuk tabung berwarna oranye. Buah dan tunas juga dapat terinfeksi.',
    treatment: 'Semprotkan fungisida berbahan miklobutanil atau trifloxysztrobin saat daun mulai tumbuh. Singkirkan pohon cedar/juniper di sekitar kebun apel jika memungkinkan. Tanam varietas apel yang tahan penyakit ini.',
    imageUrl: null,
  },
  {
    name: 'Apple - Healthy',
    slug: 'apple-healthy',
    cropType: 'apple',
    scientificName: null,
    description: 'Daun apel dalam kondisi sehat tanpa tanda-tanda penyakit atau gangguan.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau segar, permukaan mulus, dan pertumbuhan normal.',
    treatment: 'Tidak diperlukan penanganan. Pertahankan praktik budidaya yang baik: pemupukan rutin, penyiraman cukup, dan pemangkasan teratur.',
    imageUrl: null,
  },
 
  // ── Blueberry ───────────────────────────────────────────────────────────────
  {
    name: 'Blueberry - Healthy',
    slug: 'blueberry-healthy',
    cropType: 'blueberry',
    scientificName: null,
    description: 'Daun blueberry dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau segar dengan pertumbuhan normal.',
    treatment: 'Tidak diperlukan penanganan. Jaga pH tanah antara 4.5–5.5 untuk pertumbuhan optimal.',
    imageUrl: null,
  },
 
  // ── Cherry ──────────────────────────────────────────────────────────────────
  {
    name: 'Cherry - Powdery Mildew',
    slug: 'cherry-powdery-mildew',
    cropType: 'cherry',
    scientificName: 'Podosphaera clandestina',
    description: 'Penyakit jamur yang menyebabkan lapisan putih seperti tepung pada permukaan daun ceri.',
    symptoms: 'Lapisan putih atau abu-abu seperti tepung pada permukaan daun, terutama daun muda. Daun yang terinfeksi dapat menggulung, mengeriting, atau mengalami distorsi. Pertumbuhan tanaman terhambat.',
    treatment: 'Semprotkan fungisida sulfur atau kalium bikarbonat. Hindari pemupukan nitrogen berlebihan. Pangkas bagian yang terinfeksi parah. Pastikan sirkulasi udara baik di sekitar tanaman.',
    imageUrl: null,
  },
  {
    name: 'Cherry - Healthy',
    slug: 'cherry-healthy',
    cropType: 'cherry',
    scientificName: null,
    description: 'Daun ceri dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau mengkilap dengan pertumbuhan normal.',
    treatment: 'Tidak diperlukan penanganan. Lakukan pemangkasan rutin dan jaga kebersihan kebun.',
    imageUrl: null,
  },
 
  // ── Corn (Maize) ────────────────────────────────────────────────────────────
  {
    name: 'Corn - Cercospora Leaf Spot (Gray Leaf Spot)',
    slug: 'corn-cercospora-leaf-spot',
    cropType: 'corn',
    scientificName: 'Cercospora zeae-maydis',
    description: 'Penyakit jamur serius pada jagung yang dapat menyebabkan kehilangan hasil panen signifikan, terutama di daerah dengan kelembapan tinggi.',
    symptoms: 'Bercak abu-abu atau coklat memanjang sejajar urat daun, berukuran 1–6 cm. Bercak dibatasi oleh urat daun sehingga tampak persegi panjang. Pada infeksi berat, seluruh daun dapat mengering.',
    treatment: 'Tanam varietas tahan penyakit. Rotasi tanaman dengan tanaman bukan jagung. Semprotkan fungisida strobilurin atau triazol saat gejala awal muncul. Bajak sisa tanaman setelah panen.',
    imageUrl: null,
  },
  {
    name: 'Corn - Common Rust',
    slug: 'corn-common-rust',
    cropType: 'corn',
    scientificName: 'Puccinia sorghi',
    description: 'Penyakit jamur yang umum pada jagung, ditandai dengan pustul berwarna coklat kemerahan pada permukaan daun.',
    symptoms: 'Pustul kecil berwarna coklat kemerahan tersebar di kedua sisi permukaan daun. Pustul dapat pecah dan mengeluarkan spora berwarna coklat kemerahan seperti debu. Daun yang terinfeksi berat menguning dan mati.',
    treatment: 'Tanam varietas jagung tahan karat. Semprotkan fungisida berbahan mancozeb atau propikonazol saat pustul pertama muncul. Rotasi tanaman untuk mengurangi sumber inokulum.',
    imageUrl: null,
  },
  {
    name: 'Corn - Northern Leaf Blight',
    slug: 'corn-northern-leaf-blight',
    cropType: 'corn',
    scientificName: 'Exserohilum turcicum',
    description: 'Penyakit jamur yang menyebabkan bercak panjang berwarna abu-abu kehijauan pada daun jagung.',
    symptoms: 'Lesi panjang berbentuk cerutu berwarna abu-abu kehijauan hingga coklat, berukuran 2.5–15 cm. Lesi biasanya muncul pertama kali pada daun bagian bawah kemudian menyebar ke atas. Pada kondisi lembap, lesi tampak berjelaga karena sporulasi jamur.',
    treatment: 'Gunakan benih varietas tahan penyakit. Rotasi tanaman minimal 1 tahun. Semprotkan fungisida triazol atau strobilurin saat gejala pertama terdeteksi. Olah tanah untuk mengubur sisa tanaman terinfeksi.',
    imageUrl: null,
  },
  {
    name: 'Corn - Healthy',
    slug: 'corn-healthy',
    cropType: 'corn',
    scientificName: null,
    description: 'Daun jagung dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau cerah dengan pertumbuhan tegak dan normal.',
    treatment: 'Tidak diperlukan penanganan. Jaga kesuburan tanah dan lakukan penyiraman yang cukup.',
    imageUrl: null,
  },
 
  // ── Grape ───────────────────────────────────────────────────────────────────
  {
    name: 'Grape - Black Rot',
    slug: 'grape-black-rot',
    cropType: 'grape',
    scientificName: 'Guignardia bidwellii',
    description: 'Penyakit jamur paling merusak pada anggur, dapat menghancurkan seluruh hasil panen jika tidak dikendalikan.',
    symptoms: 'Bercak coklat kecil pada daun dengan tepi gelap. Buah mengalami busuk coklat dan mengkerut menjadi mumi hitam keras. Pada tunas dan tangkai buah terdapat lesi hitam memanjang.',
    treatment: 'Semprotkan fungisida kaptan atau myklobutanil sejak daun mulai tumbuh. Buang dan musnahkan buah mumi dan sisa tanaman terinfeksi. Pangkas untuk meningkatkan sirkulasi udara. Hindari irigasi dari atas.',
    imageUrl: null,
  },
  {
    name: 'Grape - Esca (Black Measles)',
    slug: 'grape-esca-black-measles',
    cropType: 'grape',
    scientificName: 'Phaeomoniella chlamydospora',
    description: 'Kompleks penyakit kayu pada anggur yang disebabkan oleh beberapa jamur patogen, bersifat kronis dan sulit disembuhkan.',
    symptoms: 'Bercak coklat atau hitam di antara urat daun membentuk pola seperti harimau (tiger stripe). Buah menunjukkan bercak ungu-hitam kecil. Pada kasus parah, tanaman dapat layu mendadak dan mati dalam satu musim.',
    treatment: 'Tidak ada penanganan kimia yang efektif untuk infeksi yang sudah parah. Pangkas bagian kayu yang terinfeksi jauh di bawah area bergejala. Lindungi luka pangkasan dengan pasta fungisida. Tanaman yang terinfeksi berat sebaiknya dicabut.',
    imageUrl: null,
  },
  {
    name: 'Grape - Leaf Blight (Isariopsis Leaf Spot)',
    slug: 'grape-leaf-blight-isariopsis',
    cropType: 'grape',
    scientificName: 'Pseudocercospora vitis',
    description: 'Penyakit jamur yang menyerang daun anggur terutama menjelang akhir musim tanam.',
    symptoms: 'Bercak coklat gelap tidak beraturan pada permukaan atas daun. Sisi bawah daun menunjukkan pertumbuhan jamur berwarna abu-abu gelap. Daun yang terinfeksi berat mengering dan rontok sebelum waktunya.',
    treatment: 'Semprotkan fungisida tembaga atau mankozeb. Buang daun-daun yang terinfeksi. Hindari kelembapan berlebihan di sekitar kanopi tanaman. Jaga sirkulasi udara dengan pemangkasan rutin.',
    imageUrl: null,
  },
  {
    name: 'Grape - Healthy',
    slug: 'grape-healthy',
    cropType: 'grape',
    scientificName: null,
    description: 'Daun anggur dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau dengan tekstur normal dan pertumbuhan baik.',
    treatment: 'Tidak diperlukan penanganan. Lakukan pemangkasan rutin dan manajemen kanopi yang baik.',
    imageUrl: null,
  },
 
  // ── Orange ──────────────────────────────────────────────────────────────────
  {
    name: 'Orange - Haunglongbing (Citrus Greening)',
    slug: 'orange-haunglongbing',
    cropType: 'orange',
    scientificName: 'Candidatus Liberibacter spp.',
    description: 'Penyakit bakteri paling destruktif pada tanaman jeruk, ditularkan oleh serangga psyllid. Belum ada obat yang efektif.',
    symptoms: 'Daun menguning tidak merata (blotchy mottle) berbeda dari defisiensi nutrisi. Buah kecil, asimetris, berwarna kuning-hijau saat matang, dan pahit. Akar tanaman membusuk pada infeksi lanjut.',
    treatment: 'Tidak ada obat yang dapat menyembuhkan tanaman terinfeksi. Kendalikan vektor psyllid dengan insektisida sistemik. Cabut dan musnahkan tanaman terinfeksi untuk mencegah penyebaran. Gunakan bibit bersertifikat bebas penyakit.',
    imageUrl: null,
  },
 
  // ── Peach ───────────────────────────────────────────────────────────────────
  {
    name: 'Peach - Bacterial Spot',
    slug: 'peach-bacterial-spot',
    cropType: 'peach',
    scientificName: 'Xanthomonas arboricola pv. pruni',
    description: 'Penyakit bakteri yang menyerang daun, ranting, dan buah persik, menyebabkan kerusakan serius terutama saat musim hujan.',
    symptoms: 'Bercak kecil bersudut berwarna hijau gelap pada daun yang berubah menjadi coklat dengan tepi kuning. Bagian tengah bercak sering rontok membentuk lubang (shot hole). Buah menunjukkan bercak dangkal berwarna gelap.',
    treatment: 'Semprotkan bakterisida berbahan tembaga saat musim semi. Hindari irigasi dari atas. Pangkas untuk meningkatkan sirkulasi udara. Gunakan varietas yang lebih tahan terhadap bakteri ini.',
    imageUrl: null,
  },
  {
    name: 'Peach - Healthy',
    slug: 'peach-healthy',
    cropType: 'peach',
    scientificName: null,
    description: 'Daun persik dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau cerah dengan tekstur halus dan pertumbuhan normal.',
    treatment: 'Tidak diperlukan penanganan. Lakukan pemupukan dan pengairan yang tepat.',
    imageUrl: null,
  },
 
  // ── Pepper ──────────────────────────────────────────────────────────────────
  {
    name: 'Pepper Bell - Bacterial Spot',
    slug: 'pepper-bell-bacterial-spot',
    cropType: 'pepper',
    scientificName: 'Xanthomonas campestris pv. vesicatoria',
    description: 'Penyakit bakteri umum pada paprika dan cabai yang menyebabkan bercak pada daun dan buah.',
    symptoms: 'Bercak kecil berair berwarna hijau gelap pada daun yang berubah menjadi coklat dengan halo kuning. Buah menunjukkan bercak kasar berwarna coklat. Daun yang terinfeksi berat dapat rontok.',
    treatment: 'Gunakan benih bebas penyakit atau benih yang telah diperlakukan. Semprotkan bakterisida tembaga secara rutin. Hindari penyiraman dari atas. Rotasi tanaman 2–3 tahun.',
    imageUrl: null,
  },
  {
    name: 'Pepper Bell - Healthy',
    slug: 'pepper-bell-healthy',
    cropType: 'pepper',
    scientificName: null,
    description: 'Daun paprika dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau cerah mengkilap dengan pertumbuhan normal.',
    treatment: 'Tidak diperlukan penanganan. Pastikan drainase tanah baik dan hindari kelembapan berlebihan.',
    imageUrl: null,
  },
 
  // ── Potato ──────────────────────────────────────────────────────────────────
  {
    name: 'Potato - Early Blight',
    slug: 'potato-early-blight',
    cropType: 'potato',
    scientificName: 'Alternaria solani',
    description: 'Penyakit jamur yang umum menyerang kentang, biasanya muncul setelah tanaman mulai berbunga.',
    symptoms: 'Bercak coklat gelap berbentuk konsentris seperti cincin target pada daun tua. Bercak dikelilingi jaringan kuning. Daun yang terinfeksi berat menguning dan rontok dari bawah ke atas.',
    treatment: 'Semprotkan fungisida mankozeb atau klorotalonil sejak gejala pertama muncul. Pangkas daun bawah yang terinfeksi. Hindari stres pada tanaman dengan pemupukan dan pengairan yang tepat. Rotasi tanaman.',
    imageUrl: null,
  },
  {
    name: 'Potato - Late Blight',
    slug: 'potato-late-blight',
    cropType: 'potato',
    scientificName: 'Phytophthora infestans',
    description: 'Penyakit oomycete yang sangat merusak dan menjadi penyebab kelaparan besar di Irlandia abad ke-19. Dapat menghancurkan seluruh ladang dalam waktu singkat.',
    symptoms: 'Bercak hijau gelap berair pada tepi daun yang cepat membesar dan berwarna coklat kehitaman. Pada kondisi lembap, tumbuh lapisan putih berbulu di sisi bawah daun. Umbi menunjukkan busuk coklat-kemerahan.',
    treatment: 'Semprotkan fungisida metalaksil atau mankozeb secara preventif saat cuaca mendukung penyakit. Singkirkan dan musnahkan tanaman terinfeksi segera. Hindari penyiraman berlebih. Panen lebih awal jika infeksi berat.',
    imageUrl: null,
  },
  {
    name: 'Potato - Healthy',
    slug: 'potato-healthy',
    cropType: 'potato',
    scientificName: null,
    description: 'Daun kentang dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau dengan pertumbuhan normal dan seragam.',
    treatment: 'Tidak diperlukan penanganan. Lakukan rotasi tanaman dan gunakan benih kentang bersertifikat.',
    imageUrl: null,
  },
 
  // ── Raspberry ───────────────────────────────────────────────────────────────
  {
    name: 'Raspberry - Healthy',
    slug: 'raspberry-healthy',
    cropType: 'raspberry',
    scientificName: null,
    description: 'Daun raspberry dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau segar dengan pertumbuhan normal.',
    treatment: 'Tidak diperlukan penanganan. Jaga drainase tanah yang baik dan lakukan pemangkasan rutin.',
    imageUrl: null,
  },
 
  // ── Soybean ─────────────────────────────────────────────────────────────────
  {
    name: 'Soybean - Healthy',
    slug: 'soybean-healthy',
    cropType: 'soybean',
    scientificName: null,
    description: 'Daun kedelai dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau cerah dengan pertumbuhan normal.',
    treatment: 'Tidak diperlukan penanganan. Pastikan kondisi tanah optimal dan rotasi tanaman rutin.',
    imageUrl: null,
  },
 
  // ── Squash ──────────────────────────────────────────────────────────────────
  {
    name: 'Squash - Powdery Mildew',
    slug: 'squash-powdery-mildew',
    cropType: 'squash',
    scientificName: 'Podosphaera xanthii',
    description: 'Penyakit jamur yang sangat umum pada labu dan cucurbit lainnya, berkembang pesat dalam kondisi kering dengan kelembapan malam tinggi.',
    symptoms: 'Lapisan putih seperti tepung pada permukaan atas daun, dimulai dari bercak kecil yang meluas ke seluruh daun. Daun yang terinfeksi berat menguning dan mengering. Buah bisa ikut terinfeksi dan kualitasnya menurun.',
    treatment: 'Semprotkan fungisida sulfur, kalium bikarbonat, atau neem oil. Hindari pemupukan nitrogen berlebihan. Buang daun yang terinfeksi parah. Tanam varietas yang lebih tahan.',
    imageUrl: null,
  },
 
  // ── Strawberry ──────────────────────────────────────────────────────────────
  {
    name: 'Strawberry - Leaf Scorch',
    slug: 'strawberry-leaf-scorch',
    cropType: 'strawberry',
    scientificName: 'Diplocarpon earlianum',
    description: 'Penyakit jamur umum pada stroberi yang menyebabkan bercak ungu-merah pada daun.',
    symptoms: 'Bercak kecil tidak beraturan berwarna ungu-merah pada permukaan atas daun. Pusat bercak berubah menjadi coklat hingga abu-abu. Pada infeksi berat, bercak-bercak menyatu dan seluruh daun terlihat terbakar (scorched).',
    treatment: 'Buang daun yang terinfeksi dan musnahkan. Semprotkan fungisida kaptan atau tembaga. Hindari penyiraman dari atas. Pastikan jarak tanam cukup untuk sirkulasi udara yang baik.',
    imageUrl: null,
  },
  {
    name: 'Strawberry - Healthy',
    slug: 'strawberry-healthy',
    cropType: 'strawberry',
    scientificName: null,
    description: 'Daun stroberi dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau cerah dengan permukaan mulus dan pertumbuhan normal.',
    treatment: 'Tidak diperlukan penanganan. Ganti tanaman setiap 3–4 tahun dan jaga kebersihan bedengan.',
    imageUrl: null,
  },
 
  // ── Tomato ──────────────────────────────────────────────────────────────────
  {
    name: 'Tomato - Bacterial Spot',
    slug: 'tomato-bacterial-spot',
    cropType: 'tomato',
    scientificName: 'Xanthomonas vesicatoria',
    description: 'Penyakit bakteri yang menyerang semua bagian tanaman tomat di atas tanah, terutama parah saat cuaca hangat dan hujan.',
    symptoms: 'Bercak kecil berair berwarna coklat gelap dengan halo kuning pada daun. Bercak dapat berlubang di tengah. Buah menunjukkan bintik-bintik kecil kasar berwarna coklat yang merusak penampilan.',
    treatment: 'Semprotkan bakterisida tembaga secara preventif. Gunakan benih bebas penyakit. Hindari irigasi dari atas dan bekerja di kebun saat daun basah. Rotasi tanaman 2–3 tahun.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Early Blight',
    slug: 'tomato-early-blight',
    cropType: 'tomato',
    scientificName: 'Alternaria solani',
    description: 'Penyakit jamur yang umum pada tomat, menyerang daun tua terlebih dahulu dan menyebar ke atas.',
    symptoms: 'Bercak coklat gelap dengan pola cincin konsentris (target) pada daun tua dan bawah. Bercak dikelilingi jaringan kuning. Tangkai dan batang dapat menunjukkan lesi gelap memanjang.',
    treatment: 'Semprotkan fungisida mankozeb, klorotalonil, atau tembaga. Pangkas daun bawah secara rutin. Mulsa tanah untuk mencegah percikan air. Rotasi tanaman 2–3 tahun.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Late Blight',
    slug: 'tomato-late-blight',
    cropType: 'tomato',
    scientificName: 'Phytophthora infestans',
    description: 'Penyakit oomycete yang sangat agresif dan dapat memusnahkan ladang tomat dalam beberapa hari jika kondisi mendukung.',
    symptoms: 'Bercak hijau gelap berminyak pada daun yang cepat berubah menjadi coklat-hitam. Lapisan putih berbulu di sisi bawah daun saat lembap. Batang dan buah membusuk dengan cepat.',
    treatment: 'Semprotkan fungisida metalaksil atau mankozeb secara preventif. Singkirkan tanaman terinfeksi segera. Hindari penyiraman berlebih dan kelembapan tinggi. Tanam varietas tahan jika tersedia.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Leaf Mold',
    slug: 'tomato-leaf-mold',
    cropType: 'tomato',
    scientificName: 'Passalora fulva',
    description: 'Penyakit jamur yang terutama menyerang daun tomat dalam kondisi lembap dan panas, umum pada budidaya dalam rumah kaca.',
    symptoms: 'Bercak kuning pucat tidak beraturan pada permukaan atas daun. Sisi bawah daun menunjukkan pertumbuhan jamur berwarna abu-abu kehijauan hingga ungu coklat. Daun yang terinfeksi berat mengering dan rontok.',
    treatment: 'Kurangi kelembapan dengan ventilasi yang baik terutama di rumah kaca. Semprotkan fungisida tembaga atau mankozeb. Pangkas daun bawah untuk meningkatkan sirkulasi udara.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Septoria Leaf Spot',
    slug: 'tomato-septoria-leaf-spot',
    cropType: 'tomato',
    scientificName: 'Septoria lycopersici',
    description: 'Penyakit jamur yang sangat umum pada tomat, menyebabkan defoliasi parah dan melemahkan tanaman.',
    symptoms: 'Bercak kecil bulat berwarna putih atau abu-abu dengan tepi coklat gelap pada daun bawah. Di tengah bercak terdapat titik-titik hitam kecil (piknidium). Bercak muncul pertama kali di daun tua paling bawah.',
    treatment: 'Pangkas dan buang daun terinfeksi. Semprotkan fungisida mankozeb atau klorotalonil. Mulsa tanah untuk mencegah percikan. Hindari penyiraman dari atas dan rotasi tanaman.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Spider Mites (Two-Spotted Spider Mite)',
    slug: 'tomato-spider-mites',
    cropType: 'tomato',
    scientificName: 'Tetranychus urticae',
    description: 'Serangan tungau laba-laba yang menyebabkan kerusakan serius pada tanaman tomat terutama saat cuaca panas dan kering.',
    symptoms: 'Bintik-bintik kuning kecil (stippling) pada permukaan atas daun. Sisi bawah daun tampak berdebu dengan jaring halus. Daun yang terinfeksi berat menguning, mengering, dan rontok.',
    treatment: 'Semprotkan akarisida atau insektisida mitisida. Neem oil dan sabun insektisida efektif untuk populasi rendah. Tingkatkan kelembapan udara. Musuh alami seperti Phytoseiulus persimilis dapat dilepaskan.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Target Spot',
    slug: 'tomato-target-spot',
    cropType: 'tomato',
    scientificName: 'Corynespora cassiicola',
    description: 'Penyakit jamur yang menyerang daun, batang, dan buah tomat, berkembang baik pada kondisi hangat dan lembap.',
    symptoms: 'Bercak coklat dengan pola cincin konsentris pada daun. Bercak memiliki halo kuning di sekelilingnya. Buah menunjukkan bercak cekung berwarna coklat gelap. Dapat menyebabkan defoliasi parah.',
    treatment: 'Semprotkan fungisida mankozeb, klorotalonil, atau azoksistrobin. Pangkas daun bawah untuk sirkulasi udara. Hindari kelembapan berlebih dan rotasi tanaman.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Yellow Leaf Curl Virus',
    slug: 'tomato-yellow-leaf-curl-virus',
    cropType: 'tomato',
    scientificName: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    description: 'Penyakit virus yang ditularkan oleh kutu kebul (whitefly) dan menjadi salah satu penyakit paling merusak pada tomat di daerah tropis.',
    symptoms: 'Daun muda menguning dan menggulung ke atas. Tanaman kerdil dengan ruas yang pendek. Bunga rontok sehingga produksi buah sangat berkurang. Daun tampak lebih kecil dari normal.',
    treatment: 'Tidak ada obat untuk tanaman yang sudah terinfeksi. Kendalikan vektor kutu kebul dengan insektisida sistemik. Gunakan mulsa reflektif untuk mengusir kutu kebul. Cabut dan musnahkan tanaman terinfeksi. Gunakan varietas tahan TYLCV.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Mosaic Virus',
    slug: 'tomato-mosaic-virus',
    cropType: 'tomato',
    scientificName: 'Tomato Mosaic Virus (ToMV)',
    description: 'Penyakit virus yang menyebar melalui kontak mekanis dan sangat persisten di lingkungan.',
    symptoms: 'Pola mosaik kuning-hijau tidak merata pada daun. Daun mengkerut dan menggulung. Buah menunjukkan bercak kekuningan atau kematangan tidak merata. Tanaman tumbuh kerdil.',
    treatment: 'Tidak ada pengobatan untuk tanaman terinfeksi. Cuci tangan dengan sabun sebelum bekerja di kebun. Disinfeksi alat pertanian secara rutin. Cabut tanaman terinfeksi. Gunakan benih dan bibit bersertifikat bebas virus.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Healthy',
    slug: 'tomato-healthy',
    cropType: 'tomato',
    scientificName: null,
    description: 'Daun tomat dalam kondisi sehat tanpa tanda-tanda penyakit.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau tua mengkilap dengan pertumbuhan normal dan tegak.',
    treatment: 'Tidak diperlukan penanganan. Lakukan pemupukan seimbang, pengairan rutin, dan pemangkasan tunas air secara berkala.',
    imageUrl: null,
  },
]
 
async function main() {
  console.log('🌱 Memulai proses seeding...')
  console.log(`📋 Total data penyakit: ${diseases.length} entri\n`)
 
  let created = 0
  let skipped = 0
 
  for (const disease of diseases) {
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
 