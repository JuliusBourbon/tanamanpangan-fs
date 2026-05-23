export function LogoIcon({ className = 'w-9 h-9' }) {
  return (
    <div className={`bg-[#2a7a53] rounded-xl flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[60%] h-[60%]"
      >
        {/* Daun tengah — tegak ke atas */}
        <path
          d="M16 26 C16 26 16 14 16 10 C16 6 19 4 22 4 C22 8 20 12 16 14"
          fill="white"
        />
        <path
          d="M16 26 C16 26 16 14 16 10 C16 6 13 4 10 4 C10 8 12 12 16 14"
          fill="white"
        />
        {/* Daun kiri bawah */}
        <path
          d="M16 22 C16 22 10 20 7 17 C5 15 5 12 7 11 C10 13 13 17 16 22"
          fill="white"
          opacity="0.85"
        />
        {/* Daun kanan bawah */}
        <path
          d="M16 22 C16 22 22 20 25 17 C27 15 27 12 25 11 C22 13 19 17 16 22"
          fill="white"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}

export function LogoBrand({ iconSize, textSize = 'text-xl' }) {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon className={iconSize} />
      <span className={`text-[#2a7a53] font-bold tracking-tight ${textSize}`}>
        Tanam Pangan
      </span>
    </div>
  )
}

export function LogoBrandLight({ iconSize, textSize = 'text-lg' }) {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon className={iconSize} />
      <span className={`text-white font-bold tracking-tight ${textSize}`}>
        Tanam Pangan
      </span>
    </div>
  )
}
