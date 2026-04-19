"use client";

import { handleLogout } from "@/actions";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function RightNavbar({ token, username }: { token: string | undefined; username: string | undefined }) {

    const router = useRouter();
    return (
        <div className="flex items-center gap-4">

            {token ? (
                <>
                    {/* USER NAME */}

                    <div className="flex items-center gap-2 text-sm text-white">

                        {/* ACCOUNT ICON */}
                        <span>hello, {username ? username : "User"}!</span>
                        <div className="w-10 h-10 rounded-full bg-[#1c1f26] flex items-center justify-center">
                        👤
                        </div>

                        

                    </div>

                    {/* SIGN OUT */}

                    <button className="bg-blue-500 px-4 py-2 cursor-pointer hover:bg-blue-400 rounded text-sm" onClick={handleLogout}>
                        Sign out
                    </button>
                </>
            ) : (
                <>
                <Link href="/register" className="text-sm text-gray-400 hover:text-white">
                    Sign up
                </Link>

                <button className="bg-blue-500 px-4 py-2 cursor-pointer hover:bg-blue-400 rounded text-sm" onClick={() => router.push("/login")}>
                    Sign in
                </button>
                </>
            ) }

            

        </div>
    )
}