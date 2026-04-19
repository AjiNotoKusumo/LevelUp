import UserModel from "@/db/models/UserModel"
import errorHandler from "@/helpers/errorHandler"


export async function POST(req: Request) {
    try {
        const userData = await req.json()
        
        await UserModel.register(userData)

        return Response.json({ message: "User registered successfully" }, { status: 201 })
    } catch (error) {
        return errorHandler(error)
    }
}