import { ObjectId } from "mongodb";
import { db } from "../config/mongodb";


class WishlistModel {
    static collection() {
        return db.collection("wishlists")
    }

    static async findAll(userId: string) {
        return await this.collection().aggregate(
            [
                {
                    '$match': {
                    'userId': new ObjectId(userId)
                    }
                }, {
                    '$lookup': {
                    'from': 'products', 
                    'localField': 'productId', 
                    'foreignField': '_id', 
                    'as': 'product'
                    }
                }, {
                    '$unwind': {
                    'path': '$product'
                    }
                }
            ]
        ).toArray()
    }

    static async createWishlist(userId: string, productId: string) {
          
        const existingWishlist = await this.collection().findOne({ 
            userId: new ObjectId(userId), 
            productId: new ObjectId(productId) 
        })
    
        if (existingWishlist) throw { message: "Product already in wishlist" , status: 400 }

        const newWishlist = await this.collection().insertOne({ 
            userId: new ObjectId(userId), 
            productId: new ObjectId(productId),
            createdAt: new Date(),
            updatedAt: new Date()
        })
         
         
        return newWishlist
    }

    static async removeWishlist(userId: string, productId: string) {
        const existingWishlist = await this.collection().findOne({ 
            userId: new ObjectId(userId), 
            productId: new ObjectId(productId) 
        })
    
        if (!existingWishlist) throw { message: "Product not in wishlist" , status: 400 }

        await this.collection().deleteOne({ 
            userId: new ObjectId(userId), 
            productId: new ObjectId(productId) 
        })

        return { message: "Product removed from wishlist" }
    }
}

export default WishlistModel