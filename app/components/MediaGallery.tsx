"use client"

import { useState } from "react"

export default function MediaGallery({ media }: { media: string[] }) {

  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length)
  }

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    )
  }

  return (

    <div>

      {/* MAIN MEDIA */}

      <div className="relative w-full h-[480px] group rounded-lg overflow-hidden bg-black animate-fade-in delay-200">

        {/* SLIDER CONTAINER */}

        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >

          {media.map((item, index) => (

            <div
              key={index}
              className="min-w-full h-full"
            >

                <img
                  src={item}
                  alt=""
                  className="w-full h-full object-cover"
                />



            </div>

          ))}

        </div>


        {/* LEFT ARROW */}

        <button
          onClick={prev}
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          bg-black/60
          hover:bg-black/80
          px-3
          py-2
          rounded
          cursor-pointer
          text-white
          text-xl
          transition
          opacity-0
          group-hover:opacity-100
          "
        >
          ←
        </button>


        {/* RIGHT ARROW */}

        <button
          onClick={next}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          bg-black/60
          hover:bg-black/80
          px-3
          py-2
          cursor-pointer
          rounded
          text-white
          text-xl
          transition
            opacity-0
            group-hover:opacity-100
          "
        >
          →
        </button>

      </div>


      {/* THUMBNAILS */}

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4 animate-fade-in delay-300">

        {media.map((item, index) => (

          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              relative
              min-w-[140px]
              min-h-[80px]
              rounded
              overflow-hidden
              border
              cursor-pointer
              ${currentIndex === index
                ? "border-blue-400"
                : "border-transparent"}
            `}
          >

              <img
                src={item}
                alt=""
                className="w-full h-full object-cover"
              />

          </button>

        ))}

      </div>

    </div>
  )
}