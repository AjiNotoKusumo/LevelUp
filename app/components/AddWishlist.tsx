"use client"

import { WishlistItem } from "@/types"
import Lottie from "lottie-react"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import loadingAnimation from "@/public/loading.json"
import { useRouter } from "next/navigation"

export default function AddWishlist({ productId }: { productId: string }) {
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()


    const fetchWishlist = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`)

            if (!response.ok) {
                throw new Error("Failed to fetch wishlist.");
            }
            
            const data = await response.json()

            setIsWishlisted(data.some((item: WishlistItem) => item.productId === productId))

        } catch (error) {
            console.log(error);
            setIsWishlisted(false)
        } finally {
            setLoading(false)
        }
    }

    const handleWishlist = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId })
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

    const handleRemove = async () => {
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
                body: JSON.stringify({ productId })
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
        fetchWishlist()
    }, [])


    return (
        <>
        <button onClick={isWishlisted ? handleRemove : handleWishlist} className="w-full cursor-pointer bg-[#2b2f38] hover:bg-[#3a3f49] py-3 rounded flex items-center justify-center gap-2">
            {loading ? 
                <div className="w-6 h-6">
                    <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
                </div>
            :
                (isWishlisted ? "Remove from Wishlist" : "Wishlist")
            }
        </button>

        <button className="bg-[#1c1f26] px-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg> 
        </button>
        </>
)
}