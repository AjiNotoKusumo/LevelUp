import ProductModel from "@/db/models/ProductModel";
import errorHandler from "@/helpers/errorHandler";

export async function GET(
    req: Request,
    {params}: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        const product = await ProductModel.findBySlug(slug)

        if (!product) throw { message: "Product not found", status: 404 }

        return Response.json( product , { status: 200 })
    } catch (error) {
        return errorHandler(error)
    }
}