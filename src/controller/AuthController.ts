import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { sign, verify } from "../middlewares/jwt"

export class AuthController {
    private userRepository = AppDataSource.getRepository(User)

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body

        const user = await this.userRepository.findOne({
            where: { email, password },
            select: ["id", "fullName", "email"]
        })

        if (!user) {
            return "Unauthorized"
        }

        const token = await sign(request, response, next)

        return { user, token }
        // return user
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const { fullName, email, password } = request.body

        const user = Object.assign(new User(), {
            fullName,
            email,
            password
        })

        response.status(201).send("User has been created successfully")

        return this.userRepository.save(user)
    }
}