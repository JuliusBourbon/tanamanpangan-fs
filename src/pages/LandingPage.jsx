export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-76px)] flex flex-col items-center justify-center bg-linear-to-br to-[#FEC200]/40 from-[#5CD4B8] px-4 font-sans text-center">
      
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 mb-8 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#5cd9b6]"></span>
        <span className="text-sm font-medium text-gray-700">AI Computer Vision Powered</span>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-[70px] leading-tight font-bold text-black mb-6 tracking-tight">
        Protect your crops with <br />
        <span className="text-white drop-shadow-sm">precision AI</span>
      </h1>

      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
        Upload plant photo, get instant diagnosis & treatment solution
      </h2>

      <div className="max-w-2xl mx-auto mb-10 text-[15px] md:text-base text-gray-800">
        <p className="mb-2">
          Khawatir tanaman Anda terserang penyakit? Dapatkan hasil diagnosis berbasis AI dan
          rekomendasi penanganan yang tepat dalam hitungan detik.
        </p>
        <p className="font-bold text-gray-900">Gratis, Mudah, Akurat.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex items-center justify-center gap-2 bg-[#2a7a53] hover:bg-[#205e40] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-green-900/20">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Start Scan Now
        </button>

        <button className="px-6 py-3 rounded-lg font-medium text-white border border-white/70 hover:bg-white/10 transition-colors backdrop-blur-sm">
          See How It Works
        </button>
      </div>

    </div>
  );
};