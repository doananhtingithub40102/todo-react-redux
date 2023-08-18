import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { TodoType } from "./Todo"

export type InitTodoStateType = {
    todos: TodoType[],
    status: string,
    error: string | null
}

const initState: InitTodoStateType = {
    todos: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null
}

const todoListSlice = createSlice({
    name: "todoList",
    initialState: initState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message as string
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload)
            })
            .addCase(toggleCompleted.fulfilled, (state, action) => {
                const indexOfChangedTodo = state.todos.findIndex(todo => todo.id === action.payload.id)

                state.todos[indexOfChangedTodo].completed = !state.todos[indexOfChangedTodo].completed
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                action.payload.forEach((id: string) => {
                    const indexOfDeleteTodo = state.todos.findIndex((todo) => todo.id === id)

                    state.todos.splice(indexOfDeleteTodo, 1)
                })
            })
            .addCase(updateId.fulfilled, (state, action) => {
                const { oldId, newId } = action.payload

                for (let i = 0; i < state.todos.length; i++) {
                    if (state.todos[i].id === oldId) {
                        const todo = {
                            userId: state.todos[i].userId,
                            id: newId,
                            title: state.todos[i].title,
                            completed: state.todos[i].completed
                        }

                        state.todos.push(todo)
                        state.todos.splice(i, 1)

                        break
                    }
                }
            })
    }
})

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    try {
        const res = await fetch("api/getTodos")
        const data = await res.json()

        return data.todos
    } catch (error) {
        return (error as Error).message
    }
})

export const addNewTodo = createAsyncThunk("todos/addNewTodo", async (newTodo: TodoType) => {
    try {
        const res = await fetch("api/addTodo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo)
        })
        const data = await res.json()

        return data.todo
    } catch (error) {
        return (error as Error).message
    }
})

export const toggleCompleted = createAsyncThunk("todos/toggleCompleted", async (id: string) => {
    try {
        const res = await fetch("api/updateCompleted", {
            method: "PATCH",
            body: id
        })
        const data = await res.json()

        return data.todo
    } catch (error) {
        return (error as Error).message
    }
})

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (idList: string[]) => {
    try {
        const res = await fetch("api/deleteTodo", {
            method: "DELETE",
            body: JSON.stringify(idList)
        })
        const data = await res.json()

        return data
    } catch (error) {
        return (error as Error).message
    }
})

export const updateId = createAsyncThunk("todos/updateId", async (id: string) => {
    try {
        const res = await fetch("api/updateId", {
            method: "PATCH",
            body: id
        })
        const data = await res.json()

        return data
    } catch (error) {
        return (error as Error).message
    }
})

export default todoListSlice