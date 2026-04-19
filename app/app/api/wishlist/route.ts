import WishlistModel from "@/db/models/WishlistModel";
import errorHandler from "@/helpers/errorHandler";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-Id");
        const wishlists = await WishlistModel.findAll(userId as string)

        return Response.json( wishlists , { status: 200 })
    } catch (error) {
        return errorHandler(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        const {productId} = await req.json();
        const userId = req.headers.get("x-user-Id");

        if(!productId || !userId) throw { message: "Product ID and User ID are required", status: 400 }
        
        await WishlistModel.createWishlist(userId as string, productId as string)

        return Response.json({ message: "Product added to wishlist" }, { status: 201 })
    } catch (error) {
        return errorHandler(error)
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const {productId} = await req.json();
        const userId = req.headers.get("x-user-Id");

        if(!productId || !userId) throw { message: "Product ID and User ID are required", status: 400 }

        await WishlistModel.removeWishlist(userId as string, productId as string)

        return Response.json({ message: "Product removed from wishlist" }, { status: 200 })
    } catch (error) {
        return errorHandler(error)
    }
}