export default function WishlistSkeleton() {
    return (
        <div className="flex gap-6 bg-[#18181c] border border-[#2a2a2e] rounded p-4 animate-pulse">

        {/* IMAGE */}

        <div className="w-[160px] h-[210px] bg-[#2a2a2e] rounded"></div>

        {/* CONTENT */}

        <div className="flex flex-col justify-between flex-1">

            <div className="flex flex-col gap-3">

            {/* developer */}

            <div className="h-3 w-24 bg-[#2a2a2e] rounded"></div>

            {/* title */}

            <div className="h-5 w-48 bg-[#2a2a2e] rounded"></div>

            {/* tags */}

            <div className="flex gap-2">

                <div className="h-6 w-16 bg-[#2a2a2e] rounded"></div>

                <div className="h-6 w-20 bg-[#2a2a2e] rounded"></div>

                <div className="h-6 w-14 bg-[#2a2a2e] rounded"></div>

            </div>

            </div>


            {/* PRICE + BUTTONS */}

            <div className="flex items-center justify-between">

            <div className="h-5 w-24 bg-[#2a2a2e] rounded"></div>

            <div className="flex gap-3">

                <div className="h-9 w-20 bg-[#2a2a2e] rounded"></div>

                <div className="h-9 w-24 bg-[#2a2a2e] rounded"></div>

            </div>

            </div>

        </div>

        </div>
    )
}