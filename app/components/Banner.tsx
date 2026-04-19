import Link from "next/link";

export default function Banner({children} : { children: React.ReactNode }) {
    return (
        <section className="relative h-140 overflow-hidden">

      {/* SLIDES */}

      {children}

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/60 flex items-center">

        <div className="max-w-[1400px] mx-auto px-6">

          <h1 className="text-5xl font-bold mb-4">
            Discover Your Next Game
          </h1>

          <p className="text-lg text-gray-300 max-w-[600px] mb-6">
            Explore thousands of games from indie studios to AAA
            publishers. Build your library and discover new adventures.
          </p>

          <Link href="/products" className="bg-blue-400 hover:bg-blue-500 px-6 py-3 rounded font-semibold text-black">
            Browse Games
          </Link>

        </div>

      </div>

    </section>
    )
}