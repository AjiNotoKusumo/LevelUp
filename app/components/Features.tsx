export default function Features() {
    return (
        <section className="bg-[#111217] border-y border-[#1f2127]">

            <div className="max-w-[1350px] mx-auto px-6 py-20">

                {/* HEADER */}

                <div className="mb-14 max-w-xl">

                <h2 className="text-3xl font-bold mb-4">
                    Why LEVEL UP
                </h2>

                <p className="text-gray-400">
                    Discover new games, track your wishlist, and instantly access
                    your favorite titles all in one place.
                </p>

                </div>


                {/* FEATURES */}

                <div className="grid md:grid-cols-3 gap-8">

                {/* FEATURE */}

                <div className="bg-[#1a1a1f] border border-[#2a2a2e] rounded-xl p-8 hover:border-gray-500 transition">

                    <div className="text-3xl mb-5">🎮</div>

                    <h3 className="text-lg font-semibold mb-2">
                    Massive Game Library
                    </h3>

                    <p className="text-sm text-gray-400">
                    Browse hundreds of indie and AAA titles across many genres.
                    </p>

                </div>


                {/* FEATURE */}

                <div className="bg-[#1a1a1f] border border-[#2a2a2e] rounded-xl p-8 hover:border-gray-500 transition">

                    <div className="text-3xl mb-5">⚡</div>

                    <h3 className="text-lg font-semibold mb-2">
                    Instant Downloads
                    </h3>

                    <p className="text-sm text-gray-400">
                    Purchase and start playing your games immediately.
                    </p>

                </div>


                {/* FEATURE */}

                <div className="bg-[#1a1a1f] border border-[#2a2a2e] rounded-xl p-8 hover:border-gray-500 transition">

                    <div className="text-3xl mb-5">❤️</div>

                    <h3 className="text-lg font-semibold mb-2">
                    Smart Wishlist
                    </h3>

                    <p className="text-sm text-gray-400">
                    Save games you love and get notified about price drops.
                    </p>

                </div>

                </div>

            </div>

        </section>
    )
}