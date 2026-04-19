export type ProductsType = {
    _id: string,
    name: string,
    slug: string,
    description: string,
    excerpt: string,
    developer: string,
    releaseDate: string,
    price: number,
    tags: string[],
    thumbnail: string,
    images: string[]
    createdAt: Date,
    updatedAt: Date
}

export type WishlistItem = {
  _id: string,
  userId: string,
  productId: string,
  createdAt: Date,
  updatedAt: Date,
  product: ProductsType
}