import { hashPassword } from "@/helpers/bcrypt";
import { db } from "../config/mongodb";
import * as z from "zod";

const User = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email format"),
    password: z.string().min(5, "Password must be at least 5 characters long"),
    name: z.string()
});

type UserType = {
    username: string,
    email: string,
    password: string,
    name: string,
} 

class UserModel {
    static collection() {
        return db.collection("users")
    }

    static async register(userData: UserType) {
        User.parse(userData)
        const existingUser = await this.collection().findOne({
            '$or': [
                { email: userData.email },
                { username: userData.username }
            ]
        })

        if (existingUser) throw { message: "Username or email already exists" , status: 400 }

        userData.password = hashPassword(userData.password)
        const newUser = await this.collection().insertOne(userData)
        
        return newUser
    }

    static async findByEmail(email: string) {
        return await this.collection().findOne({ email })
    }
}

export default UserModel