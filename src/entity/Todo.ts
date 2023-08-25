import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Todo {

        @PrimaryGeneratedColumn()
        id: number

        @Column()
        title: string

        @Column()
        completed: boolean

        //UserID is a foregin key from User table column id
        @ManyToOne(type => User, user => user.todos)
        userID: User
}