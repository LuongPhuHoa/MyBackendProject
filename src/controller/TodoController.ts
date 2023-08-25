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
            return "unregistered todo"
        }
        return todo
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { title, description } = request.body;

        const todo = Object.assign(new Todo(), {
            title,
            description
        })

        return this.todoRepository.save(todo)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let todoToRemove = await this.todoRepository.findOneBy({ id })

        if (!todoToRemove) {
            return "this todo not exist"
        }

        await this.todoRepository.remove(todoToRemove)

        return "todo has been removed"
    }

}   