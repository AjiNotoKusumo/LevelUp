import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#111318] border-t border-[#1f2430]">

        <div className="max-w-[1400px] mx-auto px-6 py-12">

            {/* STORE TITLE */}

            <h2 className="text-lg font-semibold mb-8">
            STORE
            </h2>


            {/* FOOTER GRID */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm text-gray-400">

            {/* STORE */}

            <div className="flex flex-col gap-3">
                <p className="text-white font-medium">Store</p>

                <Link href="/products" className="hover:text-white transition">
                Browse Games
                </Link>

                <Link href="/wishlist" className="hover:text-white transition">
                Wishlist
                </Link>

            </div>


            {/* ACCOUNT */}

            <div className="flex flex-col gap-3">
                <p className="text-white font-medium">Account</p>

                <Link href="/login" className="hover:text-white transition">
                Sign In
                </Link>

            </div>


            {/* ABOUT */}

            <div className="flex flex-col gap-3">
                <p className="text-white font-medium">About</p>

                <a href="https://github.com/H8-FSJS-P3S6/gc02-AjiNotoKusumo/blob/main/README.md" target="_blank" className="hover:text-white transition">
                About This Project
                </a>

                <a href="https://www.linkedin.com/in/ajinotokusumo/" target="_blank" className="hover:text-white transition">
                Developer
                </a>

            </div>


            {/* RESOURCES */}

            <div className="flex flex-col gap-3">
                <p className="text-white font-medium">Resources</p>

                <a href="https://github.com/H8-FSJS-P3S6/gc02-AjiNotoKusumo/" target="_blank" className="hover:text-white transition">
                GitHub
                </a>

            </div>

            </div>


            {/* BOTTOM */}

            <div className="border-t border-[#1f2430] mt-10 pt-6 text-sm text-gray-500 flex justify-start">

            <p>
                © {new Date().getFullYear()} Level Up. All rights reserved.
            </p>

        
            </div>

        </div>

        </footer>
    )
}