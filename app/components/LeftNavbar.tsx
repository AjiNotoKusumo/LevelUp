"use client"

import Image from "next/image";
import Link from "next/link";
import logoOnly from "@/public/color-replaced.png"
import { usePathname, useRouter } from 'next/navigation';

export default function LeftNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-lg text-white flex items-center gap-2">
                <Image
                    src={logoOnly}
                    alt="Level Up Logo"
                    width={30}
                    height={28}
                />

                <h1 className="font-bold text-lg text-white">
                LEVEL UP
                </h1>
            </Link>

            <nav className="flex gap-6 text-sm text-gray-400">
            <Link href="/products" className={pathname === "/products" ? "text-white" : "hover:text-white"}>Browse</Link>
            <Link href="/wishlist" className={pathname === "/wishlist" ? "text-white" : "hover:text-white"}>Wishlist</Link>
            </nav>

        </div>
    )
}