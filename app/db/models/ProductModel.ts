import { Filter } from "mongodb";
import { db } from "../config/mongodb";
import { ProductsType } from "@/types";

type FindAllConfig = {
    search: string,
    limit: number,
    page: number,
    sortBy: "price-asc" | "price-desc" | "newest" | "oldest" | undefined,
    minPrice: number | string,
    maxPrice: number | string,
    startDate: string,
    endDate: string
}

class ProductModel {
    static collection() {
        return db.collection<ProductsType>("products")
    }

    static async findAll({
        search = "", 
        limit = 12, 
        page = 1, 
        sortBy,
        minPrice,
        maxPrice,
        startDate,
        endDate
    }: Partial<FindAllConfig> = {}) {

        const query: Filter<ProductsType> = {
            name: { $regex: search, $options: "i" },
        }

        if(minPrice !== undefined || maxPrice !== undefined) {
            query.price = {}
            if(minPrice !== undefined) {
                query.price.$gte = Number(minPrice)
            }
            if(maxPrice !== undefined) {
                query.price.$lte = Number(maxPrice)
            }
        }

        if(startDate || endDate) {
            query.releaseDate = {}
            if(startDate) {
                query.releaseDate.$gte = startDate
            }
            if(endDate) {
                query.releaseDate.$lte = endDate
            }
        }
        
        let sortOption : { [key: string]: 1 | -1 } = {_id: 1}

        if(sortBy === "price-asc") {
            sortOption = { price: 1, _id: 1 }
        } else if(sortBy === "price-desc") {
            sortOption = { price: -1, _id: 1 }
        } else if(sortBy === "newest") {
            sortOption = { releaseDate: -1, _id: 1 }
        } else if(sortBy === "oldest") {
            sortOption = { releaseDate: 1, _id: 1 }
        } 

        const products = await this.collection()
            .find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray()
        
        const total = await this.collection().countDocuments(query)
        
        return {
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    static async findBySlug(slug: string) {

        const product = await this.collection().findOne({slug})

        return product
    }
}


export default ProductModel