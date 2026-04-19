"use client"

export default function Search({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
    return (
        <div className="max-w-[1350px] mx-auto px-6 py-6 bg-[#0e0e10] sticky top-11 z-10">

            <div className="flex items-center gap-4">

                <input
                    placeholder="Search store"
                    className="bg-[#1a1a1f] px-4 py-2 rounded-full text-sm w-64 outline-none"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>


            </div>

        </div>
    )
}