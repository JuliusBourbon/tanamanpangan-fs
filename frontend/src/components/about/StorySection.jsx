import { TEXT } from '../../constants/text'

const { about: T } = TEXT

export default function StorySection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          {/* Teks + dua foto kecil */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{T.story.heading}</h2>
          <div className="flex flex-col gap-4">
            {T.story.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-500 text-sm leading-relaxed">{p}</p>
            ))}
          </div>

          {/* Ganti div dengan <img src="..."> saat foto sudah siap */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-100 rounded-xl aspect-[4/3] flex items-center justify-center text-gray-400 text-xs">
              Foto kegiatan 1
            </div>
            <div className="bg-gray-100 rounded-xl aspect-[4/3] flex items-center justify-center text-gray-400 text-xs">
              Foto kegiatan 2
            </div>
          </div>
        </div>

        {/* Ganti div dengan <img src="..."> saat foto sudah siap */}
        <div className="bg-gray-100 rounded-2xl aspect-[3.85/4] flex items-center justify-center text-gray-400 text-sm">
          Foto kegiatan utama
        </div>
      </div>
    </section>
  )
}