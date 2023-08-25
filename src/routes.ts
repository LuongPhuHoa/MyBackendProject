import { UserController, AuthController, TodoController } from "./controller"

export const Routes = [{
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
}, {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    action: "register"
}, {
    method: "get",
    route: "/todos",
    controller: TodoController,
    action: "all",
}, {
    method: "get",
    route: "/todos/:id",
    controller: TodoController,
    action: "one",
}, {
    method: "post",
    route: "/todos",
    controller: TodoController,
    action: "save",
}, {
    method: "delete",
    route: "/todos/:id",
    controller: TodoController,
    action: "remove",
}]