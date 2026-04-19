"use client"
import currencyFormatter from "@/helpers/currencyFormat"
import { ProductsType, WishlistItem } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MouseEvent, useEffect, useState } from "react"
import Swal from "sweetalert2"


export default function ProductCard({ 
    game, 
    i, 
    wishlist, 
    fetchWishlist 
} : { 
    game: ProductsType, 
    i: number, 
    wishlist: WishlistItem[], 
    fetchWishlist: () => void 
}) {
    const[isWishlisted, setIsWishlisted] = useState(false)
    const router = useRouter()

    const handleWishlist = async (e : MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId: game._id })
            })

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            Swal.fire({ 
                title: 'Success', 
                text: 'Game added to wishlist.', 
                icon: 'success', 
                background: '#2d2d2e', 
                color: '#fff' 
            });

            console.log(response);
            fetchWishlist();
        } catch (error) {
            console.log(error);
            const message = (error as Error).message
            const redirect = await Swal.fire({ 
                title: 'Failed', 
                text: message || 'Failed to add game to wishlist.', 
                icon: 'error', 
                background: '#2d2d2e', 
                color: '#fff' 
            });

            if(redirect.isConfirmed && message === "Please login first") {
                router.push("/login");
            }
        }
    }

    const handleRemove = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const conirmation = await Swal.fire({
                title: 'Are you sure?',
                text: 'This game will be removed from your wishlist.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                background: '#2d2d2e',
                color: '#fff',
            })

            if(!conirmation.isConfirmed) {
                return Swal.fire({ 
                    title: 'Cancelled', 
                    text: 'Game is saved in your wishlist.', 
                    icon: 'error', 
                    background: '#2d2d2e', 
                    color: '#fff' 
                });
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"                
                },
                body: JSON.stringify({ productId: game._id })
            })
            
            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            Swal.fire({ 
                title: 'Removed!', 
                text: 'Game removed from wishlist.', 
                icon: 'success',
                background: '#2d2d2e',
                color: '#fff',
            });

            console.log(response);
            fetchWishlist();
        } catch (error) {
            console.log(error);
            const message = (error as Error).message
            const redirect = await Swal.fire({ 
                title: 'Failed', 
                text: message || 'Failed to remove game from wishlist.', 
                icon: 'error', 
                background: '#2d2d2e', 
                color: '#fff' 
            });

            if(redirect.isConfirmed && message === "Please login first") {
                router.push("/login");
            }
        }
    }

    useEffect(() => {
        setIsWishlisted(wishlist.some(item => item.productId === game._id))
    }, [wishlist, game._id])

    return (
        <div className="overflow-hidden">
        <Link key={i} href={`/products/${game.slug}`} className="group cursor-pointer animate-fade-in delay-100">

            {/* IMAGE */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">

                <Image
                src={game.thumbnail}
                alt={game.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition duration-300"
                />

                <button
                    className="
                    absolute top-3 right-3
                    bg-black/60
                    backdrop-blur
                    p-2
                    cursor-pointer
                    rounded
                    hover:bg-white
                    hover:text-black
                    transition
                    "
                    onClick={(e) => {isWishlisted ? handleRemove(e) : handleWishlist(e)}}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>

                </button>

            </div>

            {/* INFO */}
            <div className="mt-3 flex flex-col gap-2">

                {game.tags && game.tags.length > 0 && (
                <div className="flex items-start gap-2">
                    <span className="text-xs bg-[#2a2a2e] px-2 py-1 rounded">
                        {game.tags[0]}
                    </span>
                </div>
                )}

                <h3 className="text-md leading-tight line-clamp-2 font-bold">
                    {game.name}
                </h3>

                

                <p className="text-sm text-gray-300">
                    {currencyFormatter(game.price)}
                </p>

            </div>

        </Link>
        </div>
    )
}