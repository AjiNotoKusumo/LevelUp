import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
const secretKey = process.env.SECRET_KEY as string

type PayloadType = {
    userId: ObjectId,
    username: string,
    email: string
}


const signToken = (payload: PayloadType) => {
    return jwt.sign(payload, secretKey)
}

const verifyToken = (token: string) => {
    return jwt.verify(token, secretKey)
}

export {signToken, verifyToken}
