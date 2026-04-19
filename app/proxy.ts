import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./helpers/jwt"
import UserModel from "./db/models/UserModel"
import errorHandler from "./helpers/errorHandler"


export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get("Authorization")?.value

    if(request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) {
        if(token) {
            return NextResponse.redirect(new URL("/", request.url))
        } else {
            return NextResponse.next()
        }
    }
    
    try{
        if(!token) throw { message: "Please login first", status: 401 }

        const [type, accessToken] = token.split(" ")

        if(type !== "Bearer" || !accessToken) throw { message: "Please login first", status: 401 }


        const payload = verifyToken(accessToken) as {
            userId: string,
            username: string,
            email: string
        }
        

        const existingUser = await UserModel.findByEmail(payload.email)
        
        if(!existingUser) throw { message: "Please login first", status: 401 }

        const requestHeaders = new Headers(request.headers)
        requestHeaders.set("x-user-Id", payload.userId)
        requestHeaders.set("x-user-email", payload.email)
        requestHeaders.set("x-user-username", payload.username)
        

        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })

        return response
    } catch (error) {
        return errorHandler(error)
    }
}

export const config = {
    matcher: ["/api/wishlist", "/login", "/register"]
}