"use client"

import InfiniteScroll from "react-infinite-scroll-component"
import ProductCardSkeleton from "./ProductCardSkeleton"

export default function InfiniteScrollComponent({ 
    children, 
    fetchMoreProducts, 
    hasMore,
    length 
} : { 
    children: React.ReactNode, 
    fetchMoreProducts: () => void, 
    hasMore: boolean,
    length: number 
}) {
    return (
        <InfiniteScroll
            dataLength={length}
            next={fetchMoreProducts}       
            hasMore={hasMore}        
            loader={<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>}
            scrollThreshold={0.9}
            >
            {children}
        </InfiniteScroll>
    )
}