"use client"

import WishlistCard from "@/components/WishlistCard"
import WishlistSkeleton from "@/components/WishlistSkeleton"
import { ProductsType } from "@/types"
import { useEffect, useState } from "react"


type wishlistItem = {
  _id: string,
  userId: string,
  productId: string,
  createdAt: Date,
  updatedAt: Date,
  product: ProductsType
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<wishlistItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchWishlist = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist.");
      }

      const data = await response.json()

      setWishlist(data)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (

    <main className="min-h-screen bg-[#0e0e10] text-white">


      {/* Page Content */}

      <div className="max-w-[1100px] mx-auto px-6 py-10">

        {/* Title */}

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-semibold">
            My Wishlist
          </h1>

          <div className="text-sm text-gray-400">
            Wishlist: {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
          </div>

        </div>


        {/* Notification Banner */}

        <div className="bg-[#18181c] border border-[#2a2a2e] p-4 rounded mb-10 flex items-center justify-between">

          <p className="text-sm text-gray-300 max-w-[600px]">
            See price changes and updates for all your wished games in one place.
          </p>

        </div>


        {/* Wishlist List */}

        {loading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, index) => (
              <WishlistSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-6 min-h-[50vh]">

            {/* Horizontal Game Card */}
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center gap-6 p-20">
                <p className="text-sm text-gray-300 max-w-[600px]">
                  See all your wishlisted games here.
                </p>
              </div>
            ) : (
              wishlist.map((item: wishlistItem) => (
                <WishlistCard key={item._id} product={item.product} fetchWishlist={fetchWishlist}/>
              ))
            )}


          </div>
        )}

        


        {/* Footer note */}

        <p className="text-xs text-gray-500 mt-12">
          * You can remove and view games in your wishlist at any time.
        </p>

      </div>

    </main>
  )
}