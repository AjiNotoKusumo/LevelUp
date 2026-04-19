"use client"

import { ProductsType } from "@/types"
import { useEffect, useState } from "react"


export default function HeroCarousel({ products } : { products: ProductsType[] | [] }) {

  const [index, setIndex] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length)
    }, 4000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div
      className="flex h-full transition-transform duration-1000"
      style={{
        transform: `translateX(-${index * 100}%)`
      }}
    >

      {products.map((product, i) => (

        <div
          key={i}
          className="min-w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${product?.images[0]})` }}
        />

      ))}

    </div>

  )
}