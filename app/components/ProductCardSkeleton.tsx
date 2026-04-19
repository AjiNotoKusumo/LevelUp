export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden animate-pulse">

      {/* IMAGE */}

      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#1c1f26]">

        {/* wishlist icon placeholder */}
        <div className="absolute top-3 right-3 w-9 h-9 rounded bg-[#2a2a2e]" />

      </div>

      {/* INFO */}

      <div className="mt-3 flex flex-col gap-2">

        {/* TAG */}

        <div className="w-16 h-5 rounded bg-[#2a2a2e]" />

        {/* TITLE */}

        <div className="space-y-2">
          <div className="h-4 w-[80%] bg-[#2a2a2e] rounded" />
          <div className="h-4 w-[60%] bg-[#2a2a2e] rounded" />
        </div>

        {/* PRICE */}

        <div className="h-4 w-20 bg-[#2a2a2e] rounded mt-1" />

      </div>

    </div>
  )
}