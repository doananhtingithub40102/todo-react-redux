import { createServer, Model, Registry, Response } from "miragejs"
import { ModelDefinition } from "miragejs/-types"
import Schema from "miragejs/orm/schema"

import { TodoType } from "../components/TodoList/Todo"

const TODOS_URL: string = "https://jsonplaceholder.typicode.com/todos"

const TodoModel: ModelDefinition<TodoType> = Model.extend({})

type AppRegistry = Registry<
    {
        todo: typeof TodoModel,
        recycle: typeof TodoModel
    },
    { /* factories can be defined here */ }
>
type AppSchema = Schema<AppRegistry>

export default function configureMirage() {
    createServer({
        models: {
            todo: TodoModel,
            recycle: TodoModel
        },

        routes() {
            this.namespace = "api"

            this.passthrough(TODOS_URL)

            this.get("/getTodos", async (schema: AppSchema) => {
                const res = await fetch(TODOS_URL)
                const data: TodoType[] = await res.json()

                const todos = data.filter((item: TodoType) => item.userId === 10)

                todos.forEach((todo: any) => {
                    schema.create("todo", todo)
                })

                return schema.all("todo")
            })

            this.post("/addTodo", (schema: AppSchema, request) => {
                const todo = JSON.parse(request.requestBody)

                return schema.create("todo", todo)
            })

            this.post("/removeTodo", (schema: AppSchema, request) => {
                const todo = JSON.parse(request.requestBody)
                schema.db.emptyData()
                
                return schema.create("recycle", todo)
            })

            this.post("/removeAllTodo", (schema: AppSchema, request) => {
                const todos = JSON.parse(request.requestBody)

                todos.forEach((todo: any) => {
                    schema.create("recycle", todo)
                })

                return new Response(201, {}, { recycles: todos })
            })

            this.patch("/updateTodo", (schema: AppSchema, request) => {
                const id = request.requestBody
                const todo = schema.find("todo", id)

                todo?.update({ completed: !todo.completed })

                return todo
            })

            this.delete("/restoreTodo", (schema: AppSchema, request) => {
                const id = request.requestBody
                const todo = schema.find("recycle", id)

                todo?.destroy()

                return todo
            })

            this.delete("deleteTodo", (schema: AppSchema, request) => {
                const idList: string[] = JSON.parse(request.requestBody)

                idList.forEach(id => {
                    const todo = schema.find("todo", id)

                    todo?.destroy()
                })

                return new Response(200, {}, idList)
            })

            this.delete("clearRecycleBin", (schema: AppSchema, request) => {
                const idList: string[] = JSON.parse(request.requestBody)

                idList.forEach(id => {
                    const todo = schema.find("recycle", id)

                    todo?.destroy()
                })

                return new Response(200, {}, idList)
            })
        }
    })
}