import ProductModel from "@/db/models/ProductModel";
import errorHandler from "@/helpers/errorHandler";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = req.nextUrl

        const {search, limit, page, sortBy, minPrice, maxPrice, startDate, endDate} = Object.fromEntries(searchParams)
        
        
        const products = await ProductModel.findAll({
            search: search as string,
            limit: limit ? parseInt(limit as string) : undefined,
            page: page ? parseInt(page as string) : undefined,
            sortBy: sortBy as "price-asc" | "price-desc" | "newest" | "oldest" | undefined,
            minPrice: minPrice ? parseInt(minPrice as string) : undefined,
            maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
            startDate: startDate as string,
            endDate: endDate as string
        })

        return Response.json( products , { status: 200 })
    } catch (error) {
        return errorHandler(error)
    }
}