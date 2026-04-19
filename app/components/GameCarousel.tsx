"use client"

import currencyFormatter from "@/helpers/currencyFormat"
import { ProductsType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

export default function GameCarousel({ games }: { games: ProductsType[] }) {

  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "next" | "prev") => {

    const container = scrollRef.current
    if (!container) return

    const amount = container.clientWidth

    container.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth"
    })
  }

  return (

    <div className="relative scrollbar-hide">

      {/* LEFT BUTTON */}

      <button
        onClick={() => scroll("prev")}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 px-3 py-2 rounded cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

      </button>


      {/* CARDS */}

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
      >

        {games.map((game) => (
          
          <Link
            key={game._id}
            href={`/products/${game.slug}`}
            className="flex-none w-[calc((100%-80px)/5)] block"
          >

            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
              <Image
                src={game.thumbnail}
                alt={game.name}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-sm text-gray-400">
              {game.tags?.[0]}
            </p>

            <h3 className="font-semibold">
              {game.name}
            </h3>

            <p className="text-sm mt-1">
              {currencyFormatter(game.price)}
            </p>

          </Link>

        ))}

      </div>


      {/* RIGHT BUTTON */}

      <button
        onClick={() => scroll("next")}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 px-3 py-2 rounded cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

      </button>

    </div>
  )
}