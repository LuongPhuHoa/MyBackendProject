import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Todo } from "./Todo"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(type => Todo, todo => todo.userID)
    todos: Todo[]
}
