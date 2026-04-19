
import Link from "next/link";
import LeftNavbar from "./LeftNavbar";
import { cookies } from "next/headers";
import RightNavbar from "./RightNavbar";

export default async function Navbar() {
    const cookieStore = await cookies()
    const token = cookieStore.get("Authorization")?.value
    const username = cookieStore.get("username")?.value

    return (
        <header className="sticky top-0 z-50 bg-[#0e0e10]">

        <div className="max-w-[1350px] mx-auto flex items-center justify-between px-6 py-4">

            <LeftNavbar />

            <RightNavbar token={token} username={username} />

        </div>

        </header>
    )
}