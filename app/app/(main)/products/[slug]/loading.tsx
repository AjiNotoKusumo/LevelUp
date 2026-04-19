export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0e0e10] text-white">

      {/* CONTENT */}

      <div className="max-w-[1400px] mx-auto px-6 py-10">

        {/* TITLE */}

        <div className="h-10 w-[400px] bg-[#1c1f26] rounded mb-8 animate-pulse"></div>

        <div className="grid grid-cols-[2fr_1fr] gap-10">

          {/* MEDIA SECTION */}

          <div>

            {/* MAIN MEDIA */}

            <div className="w-full h-[480px] bg-[#1c1f26] rounded-lg animate-pulse"></div>

            {/* THUMBNAILS */}

            <div className="grid grid-cols-5 gap-3 mt-4">

              <div className="h-[80px] bg-[#1c1f26] rounded animate-pulse"></div>
              <div className="h-[80px] bg-[#1c1f26] rounded animate-pulse"></div>
              <div className="h-[80px] bg-[#1c1f26] rounded animate-pulse"></div>
              <div className="h-[80px] bg-[#1c1f26] rounded animate-pulse"></div>
              <div className="h-[80px] bg-[#1c1f26] rounded animate-pulse"></div>

            </div>

            {/* TAGS */}

            <div className="flex gap-10 mt-6">

              <div className="flex gap-2">
                <div className="h-6 w-16 bg-[#1c1f26] rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-[#1c1f26] rounded animate-pulse"></div>
                <div className="h-6 w-14 bg-[#1c1f26] rounded animate-pulse"></div>
              </div>

              <div className="h-6 w-20 bg-[#1c1f26] rounded animate-pulse"></div>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-10 space-y-3 max-w-[700px]">

              <div className="h-4 w-full bg-[#1c1f26] rounded animate-pulse"></div>
              <div className="h-4 w-full bg-[#1c1f26] rounded animate-pulse"></div>
              <div className="h-4 w-[80%] bg-[#1c1f26] rounded animate-pulse"></div>

              <div className="h-4 w-full bg-[#1c1f26] rounded mt-4 animate-pulse"></div>
              <div className="h-4 w-[90%] bg-[#1c1f26] rounded animate-pulse"></div>

            </div>

          </div>


          {/* PURCHASE PANEL */}

          <div className="space-y-5">

            <div className="w-64 h-64 bg-[#1c1f26] rounded-lg animate-pulse"></div>

            <div className="h-6 w-24 bg-[#1c1f26] rounded animate-pulse"></div>

            <div className="h-10 w-full bg-[#1c1f26] rounded animate-pulse"></div>

            <div className="border-t border-[#1f2430] pt-4 space-y-3">

              <div className="flex justify-between">
                <div className="h-4 w-20 bg-[#1c1f26] rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-[#1c1f26] rounded animate-pulse"></div>
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-20 bg-[#1c1f26] rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-[#1c1f26] rounded animate-pulse"></div>
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-20 bg-[#1c1f26] rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-[#1c1f26] rounded animate-pulse"></div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}