"use client"

import ProductCard from "@/components/ProductCard"
import { SubmitEvent, useEffect, useRef, useState } from "react"
import { ProductsType, WishlistItem } from "@/types"
import Search from "@/components/Search"
import FilterSidebar from "@/components/FilterSidebar"
import InfiniteScrollComponent from "@/components/InfiniteScroll"


export default function Products() {
  const [products, setProducts] = useState<ProductsType[]>([])
  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined)
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [filter, setFilter] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const requestIdRef = useRef(0)

  const fetchProducts = async (pageNumber: number = 1) => {
    if (isFetching && pageNumber !== 1) return

    const requestId = ++requestIdRef.current
    setIsFetching(true)

    try {
      const limit = 12

      const filterParams = new URLSearchParams({
        ...filter,
        search: debouncedSearch,
        limit: limit.toString(),
        page: pageNumber.toString(),
        sortBy: sortBy || ""
      } as Record<string, string>)

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${filterParams}`)

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const {data}: {data: ProductsType[]} = await response.json()
      

      if (requestId !== requestIdRef.current) return

      setProducts((prev) => {
        const merged = pageNumber === 1 ? data : [...prev, ...data]
        const ids = merged.map((p) => String(p._id))

        return Array.from(new Map(merged.map((p) => [String(p._id), p])).values())
      })

      setPage(pageNumber)

      setHasMore(data.length === limit)
  
    } catch (error) {
      console.log(error);
    } finally {
      if (requestId === requestIdRef.current) setIsFetching(false)
    }
  }

  const fetchWishlist = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`)

        if (!response.ok) {
            throw new Error("Failed to fetch wishlist.");
        }
        
        const data = await response.json()

        setWishlist(data)

    } catch (error) {
        console.log(error);
        setWishlist([])
        
    } 
  }

  const fetchMoreProducts = () => {
    if (!hasMore || isFetching) return
    fetchProducts(page + 1)
  }

  const resetAndFetch = () => {
    setPage(1)
    fetchProducts(1)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    resetAndFetch()
  }, [sortBy, debouncedSearch, filter])

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (
    <main className="bg-[#0e0e10] text-white min-h-screen pb-10">


      {/* SEARCH + NAV */}
      <Search search={search} setSearch={setSearch} />

      {/* MAIN CONTENT */}
      <section className="max-w-[1350px] mx-auto px-6 flex gap-10">

        {/* GAME GRID */}
        <div className="flex-1">

          <div className="flex items-center gap-4 mb-8 text-sm">

            <span className="text-gray-400">
              Show:
            </span>

            <span className="text-white">
              {products.length} {products.length === 1 ? "result" : "results"}
            </span>

          </div>


          {/* GRID */}
          <InfiniteScrollComponent 
            length={products.length}
            fetchMoreProducts={fetchMoreProducts}
            hasMore={hasMore}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">

              {products.map((game, i) => (

                <ProductCard key={game._id} game={game} i={i} wishlist={wishlist} fetchWishlist={fetchWishlist} />

              ))}

            </div>
          </InfiniteScrollComponent>

        </div>

        {/* FILTER SIDEBAR */}
        <FilterSidebar 
          sortBy={sortBy}
          setSortBy={setSortBy}
          setFilter={setFilter}
        />

      </section>


    </main>
  )
}