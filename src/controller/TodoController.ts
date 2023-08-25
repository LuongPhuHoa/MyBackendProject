import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Todo } from "../entity"

export class TodoController {

    private todoRepository = AppDataSource.getRepository(Todo)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.todoRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const todo = await this.todoRepository.findOne({
            where: { id }
        })

        if (!todo) {
            return "Unregistered Todo"
        }
        return todo
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { title, completed, userID } = request.body;

        const todo = Object.assign(new Todo(), {
            title,
            completed,
            userID
        })

        return this.todoRepository.save(todo)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let todoToRemove = await this.todoRepository.findOneBy({ id })

        if (!todoToRemove) {
            return "This Todo not exist"
        }

        await this.todoRepository.remove(todoToRemove)

        return "Todo has been removed"
    }
}   