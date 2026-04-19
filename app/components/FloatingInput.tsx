"use client"
import { useState } from "react"

export default function FloatingInput({
  label,
  value,
  onChange,
  type = "text"
} : {
  label: string,
  value: string,
  onChange: (value: string) => void,
  type?: string
}) {

  const [focused, setFocused] = useState(false)

  const isActive = focused || value

  return (

    <div className="relative">

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={()=>setFocused(true)}
        onBlur={()=>setFocused(false)}
        className="
        peer
        w-full
        bg-[#121212]
        border border-[#2a2a2e]
        rounded-md
        px-4
        pt-6
        pb-3
        text-white
        outline-none
        hover:border-gray-400
        focus:border-gray-400
        transition-all duration-200
        "
      />

      {/* Floating Label */}
      <label
        className={`
        absolute left-4
        text-gray-400
        transition-all duration-200
        pointer-events-none
        ${isActive
          ? "top-2 text-xs"
          : "top-5 text-sm"}
        `}
      >
        {label}
      </label>

    </div>

  )
}