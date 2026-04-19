"use client"

import Link from "next/link"
import FloatingInput from "../../components/FloatingInput"
import {  SubmitEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import logo from "@/public/square-image.png"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      Swal.fire({ 
        title: 'Success', 
        text: 'Login successful.', 
        icon: 'success', 
        background: '#2d2d2e', 
        color: '#fff' 
      });

      router.push("/")

    } catch (error) {
      const message = (error as Error).message.split(",")

      const htmlContent = `
          <ul>
              ${message.map(error => `<li style="padding: 4px 0;">${error}</li>`).join('')}
          </ul>
      `;
      const redirect = await Swal.fire({ 
        title: 'Login Failed', 
        html: htmlContent || '<p>Failed to login</p>', 
        icon: 'error', 
        background: '#2d2d2e', 
        color: '#fff' 
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#0e0e10] flex items-center justify-center px-6">

      {/* Login Card */}
      <div className="w-full max-w-lg bg-[#18181c] border border-[#2a2a2e] rounded-xl
        p-12 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_60px_rgba(255,255,255,0.04)]
        transition-all duration-300">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">

          <Link href="/" className="w-14 h-14 bg-white rounded flex items-center justify-center
          text-black font-bold text-lg">
            <Image src={logo} alt="Logo" className="w-14 h-14 bg-white rounded" />
          </Link>

          <h1 className="text-white text-2xl font-semibold mt-5">
            Sign in to your account
          </h1>

        </div>


        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          <FloatingInput
            label="Email"
            value={email}
            onChange={setEmail}
          />

          <FloatingInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          <div className="flex justify-between text-sm"/>


          <button
            className="
            w-full
            bg-white
            text-black
            font-semibold
            py-4
            rounded-md
            hover:bg-gray-200
            active:scale-[0.98]
            transition-all
            "
          >
            Sign In
          </button>

        </form>


        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-10">

          Don’t have an account?{" "}

          <Link href="/register" className="text-white hover:underline cursor-pointer">
            Sign up
          </Link>

        </p>

      </div>

    </main>
  )
}