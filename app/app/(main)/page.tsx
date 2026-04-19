import Banner from "@/components/Banner"
import Features from "@/components/Features"
import GameCarousel from "@/components/GameCarousel"
import HeroCarousel from "@/components/HeroCarousel"
import Link from "next/link"


export default async function Home() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=10&sortBy=newest`)
  const products = await response.json()

  return (

    <main className="bg-[#0e0e10] text-white">

      {/* HERO */}

      <Banner>
        <HeroCarousel products={products?.data} />
      </Banner>

      <Features />

      <section className="max-w-[1400px] min-h-screen mx-auto px-6 py-20">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold">
            New Releases
          </h2>

          <Link
            href="/products"
            className="text-md text-gray-400 hover:text-white transition"
          >
            See all →
          </Link>

        </div>

        <GameCarousel games={products?.data || []} />

      </section>

    </main>

  )
}
