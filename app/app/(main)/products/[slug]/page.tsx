import AddWishlist from "@/components/AddWishlist";
import MediaGallery from "@/components/MediaGallery";
import currencyFormatter from "@/helpers/currencyFormat";
import { ProductsType } from "@/types";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const product = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)

  if (!product.ok) return { title: 'Product Not Found' }

  const productData: ProductsType = await product.json()
 
  return {
    title: productData.name,
    description: productData.description,
    openGraph: {
      images: [productData.thumbnail]
    }
  }
}

export default async function ProductDetail({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)
    const product: ProductsType = await response.json()

    return (
        <>
          <main className="min-h-screen bg-[#0e0e10] text-white">

            <div className="max-w-[1400px] mx-auto px-6 py-10">

              {/* GAME TITLE */}

              <h1 className="text-4xl font-bold mb-6">
                {product.name}
              </h1>


              {/* HERO SECTION */}

              <div className="grid grid-cols-[2fr_1fr] gap-10">

                {/* MEDIA COLUMN */}

                  <div>

                      {/* VIDEO */}

                      <MediaGallery media={product.images} />

                      {/* GENRES + FEATURES */}

                      <div className="flex gap-10 mt-6">

                          <div>

                              <p className="text-sm text-gray-400 mb-2">
                              Genres
                              </p>

                              <div className="flex gap-2">
                                  {product.tags.map((tag, index) => (
                                      <span key={index} className="bg-[#1c1f26] px-3 py-1 rounded text-xs">
                                          {tag}
                                      </span>
                                  ))}

                              </div>

                          </div>


                          <div>

                              <p className="text-sm text-gray-400 mb-2">
                              Type
                              </p>

                              <span className="bg-[#1c1f26] px-3 py-1 rounded text-xs">
                              {new Date(product.releaseDate) > new Date() ? "Upcoming" : "Released"}
                              </span>

                          </div>

                      </div>


                      {/* DESCRIPTION */}

                      <div className="mt-10 text-gray-300 max-w-[700px] leading-relaxed">

                          <p>
                              {product.excerpt}
                          </p>

                          <p className="mt-4">
                              {product.description}
                          </p>

                      </div>

                  </div>


                {/* PURCHASE PANEL */}

                <div className="space-y-5 lg:block sticky top-28 h-fit">

                  {/* GAME LOGO */}

                  <img src={product.thumbnail} alt={product.name} className="w-64 h-64 object-cover rounded-lg" />

                  {/* AGE RATING */}


                  {/* PRICE */}

                  <div>

                    <p className="mt-2 text-xl font-semibold">
                      {currencyFormatter(product.price)}
                    </p>

                  </div>

                  {/* WISHLIST */}
                  
                  <div className="flex gap-3">
                    <AddWishlist productId={product._id} />
                    
                  </div>

                  {/* INFO LIST */}

                  <div className="border-t border-[#1f2430] pt-4 text-sm text-gray-400 space-y-3">

                    <div className="flex justify-between">
                      <span>Developer</span>
                      <span>{product.developer}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Publisher</span>
                      <span>{product.developer}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Available</span>
                      <span>{product.releaseDate}</span>
                    </div>

                  </div>


                  {/* SHARE BUTTONS */}

                </div>

              </div>

            </div>

          </main>
        </>
    );
}