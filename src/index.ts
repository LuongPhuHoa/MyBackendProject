import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import { Todo } from "./entity/Todo"
import { verify } from "crypto"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    const router = express.Router()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    //apply middleware
    router.use("/todos/*", verify)


    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new users for test

//    await AppDataSource.manager.save(
//         AppDataSource.manager.create(User, {
//             fullName: "Timber Saw",
//             email: "user@user.com",
//             password: "123456"
//         })
//     )

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
