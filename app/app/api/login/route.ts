import UserModel from "@/db/models/UserModel";
import { comparePassword } from "@/helpers/bcrypt";
import errorHandler from "@/helpers/errorHandler";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";
import * as z from "zod";

const LoginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(1, "Email and password are required")
})


export async function POST(req: Request) {
    try {
        const credentials = await req.json()
        LoginSchema.parse(credentials)

        const existingUser = await UserModel.findByEmail(credentials.email)

        if (!existingUser) {
            throw { message: "Invalid email or password", status: 401 }
        }

        if(!comparePassword(credentials.password, existingUser.password)) {
            throw { message: "Invalid email or password", status: 401 }
        }

        const payload = {
            userId: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        }

        const accessToken = signToken(payload)

        const cookieStore = await cookies()

        cookieStore.set("Authorization", `Bearer ${accessToken}`)
        cookieStore.set("username", existingUser.username)

        return Response.json({ message: "Login successful", accessToken }, { status: 200 })

    } catch (error) {
        return errorHandler(error)
    }
}