import { NextFunction, Request, Response } from "express"
import { SignJWT, jwtVerify, type JWTVerifyResult } from "jose"

export const sign = async (request: Request, response: Response, next: NextFunction): Promise<string> => {
    const { userID, email } = request.body

    const jwt = await new SignJWT({ userID, email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
    
    return jwt
}

export async function verify(request: Request, response: Response, next: NextFunction) {
    const token = request.headers["token"]

    if (!token) {
        return Promise.reject("Unauthorized")
    }

    const payload = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

    if (!payload) {
        return Promise.reject("Unauthorized")
    } else {
        next()
    }
}