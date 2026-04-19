"use client"

import currencyFormatter from "@/helpers/currencyFormat"
import { ProductsType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function WishlistCard({ product, fetchWishlist }: { product: ProductsType; fetchWishlist: () => void }) {
    const router = useRouter()
    
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
                body: JSON.stringify({ productId: product._id })
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

    return (
        <div className="flex gap-6 bg-[#18181c] border border-[#2a2a2e] animate-fade-in delay-200 rounded p-4 hover:bg-[#1d1d21] transition hover:border-[#3a3a3f] hover:shadow-lg">

            <Image
            src={product.thumbnail}
            width={160}
            height={210}
            alt={product.name}
            className="rounded"
            />

            <div className="flex flex-col justify-between flex-1">

            <div className="flex flex-col gap-2">

                <p className="text-xs text-gray-400">
                {product.developer}
                </p>

                <h3 className="text-lg font-medium">
                {product.name}
                </h3>

                <div className="flex gap-2">
                    {product.tags.map((tag, index) => (
                        <span key={index} className="bg-[#1c1f26] px-3 py-1 rounded text-xs">
                            {tag}
                        </span>
                    ))}

                </div>

            </div>

            <div className="flex items-center justify-between">

                <p className="font-semibold">
                    {currencyFormatter(product.price)}
                </p>

                <div className="flex gap-3">

                <button className="border cursor-pointer border-[#2a2a2e] px-4 py-2 text-sm rounded hover:bg-[#202024]" onClick={handleRemove}>
                    Remove
                </button>

                <button className="bg-white cursor-pointer text-black px-4 py-2 text-sm rounded hover:bg-gray-200" onClick={() => router.push(`/products/${product.slug}`)}>
                    View Game
                </button>

                </div>

            </div>

            </div>

        </div>
    )
}