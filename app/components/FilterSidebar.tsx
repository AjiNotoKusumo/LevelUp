"use client"

import { useState } from "react"

export default function FilterSidebar({
    sortBy,
    setSortBy,
    setFilter,
}: {
    sortBy: string | undefined,
    setSortBy: (value: string | undefined) => void,
    setFilter: (filter: Record<string, string | number>) => void
}) {
    const [minPrice, setMinPrice] = useState<number | string>("")
    const [maxPrice, setMaxPrice] = useState<number | string>("")
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")

    const sortOptions = [
        { label: "All", value: undefined },
        { label: "Newest", value: "newest" },
        { label: "Oldest", value: "oldest" },
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
    ]

    const handleFilter = () => {
        setFilter({
            minPrice,
            maxPrice,
            startDate,
            endDate
        })
    }

    const handleResetFilter = () => {
        setMinPrice("")
        setMaxPrice("")
        setStartDate("")
        setEndDate("")
        setFilter({})
    }

    return (
        <aside className="w-[260px] hidden lg:block sticky top-32 h-fit">

            <div className="bg-[#1a1a1f] border border-[#2a2a2e] rounded-xl p-5">

                <div className="flex justify-start mb-4">

                <h3 className="font-semibold">
                    Sort
                </h3>

                </div>

                <div className="space-y-3 text-sm text-gray-300">

                {sortOptions.map((option, i) => {
                    return (
                    <div key={i}>
                        <button className={`
                            text-gray-400 
                            w-full 
                            cursor-pointer 
                            text-left 
                            rounded-lg 
                            px-3 
                            py-2 
                            ${sortBy === option.value ? "text-white bg-gray-800" : "hover:text-white hover:bg-gray-800"}`
                        }
                        onClick={() => setSortBy(option.value)}
                        >
                        {option.label}
                        </button>
                    </div>
                    )
                })}

                </div>

                <div className="flex justify-between mb-4 mt-4">

                <h3 className="font-semibold">
                    Filter
                </h3>

                <button className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer" onClick={handleResetFilter}>
                    Reset
                </button>

                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-300">

                    <p className="font-medium text-white">
                    Price Range
                    </p>

                    <div className="flex gap-2">

                    <input
                        type="number"
                        placeholder="Min"
                        className="w-full bg-[#111216] border border-[#2a2a2e] rounded px-2 py-2 text-sm outline-none focus:border-blue-500"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Max"
                        className="w-full bg-[#111216] border border-[#2a2a2e] rounded px-2 py-2 text-sm outline-none focus:border-blue-500"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                    />

                    </div>

                </div>

                {/* RELEASE DATE */}

                <div className="mt-5 space-y-2 text-sm text-gray-300">

                    <p className="font-medium text-white">
                    Release Date
                    </p>

                    <div className="flex gap-2">

                    <input
                        type="date"
                        className="w-1/2 bg-[#111216] border border-[#2a2a2e] rounded px-2 py-2 text-sm outline-none focus:border-blue-500"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />

                    <input
                        type="date"
                        className="w-1/2 bg-[#111216] border border-[#2a2a2e] rounded px-2 py-2 text-sm outline-none focus:border-blue-500"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />

                    </div>

                </div>

                <div className="mt-6">

                    <button
                    className="w-full cursor-pointer bg-blue-500 hover:bg-blue-400 text-black text-sm py-2 rounded-lg transition"
                    onClick={handleFilter}
                    >
                    Apply Filters
                    </button>

                </div>

            </div>

        </aside>
    )
}