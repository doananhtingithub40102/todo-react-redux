import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { TodoType } from "./Todo"

const TODOS_URL: string = "https://jsonplaceholder.typicode.com/todos"

export type InitStateType = {
    todos: TodoType[],
    status: string,
    error: string | null
}

const initState: InitStateType = {
    todos: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null
}

type ActionType<T = TodoType> = {
    type: string,
    payload: T
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    try {
        const res = await fetch(TODOS_URL)
        let data = await res.json()
        data = (data as TodoType[]).filter((todo) => todo.userId === 10)

        return data
    } catch (error) {
        return (error as Error).message
    }
})

export const addNewTodos = createAsyncThunk("todos/addNewTodos", async (newTodo: Omit<TodoType, "id">) => {
    try {
        const res = await fetch(TODOS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo)
        })
        const data = await res.json()

        return data
    } catch (error) {
        return (error as Error).message
    }
})

const todoListSlice = createSlice({
    name: "todoList",
    initialState: initState,
    reducers: {
        addTodo: (state, action: ActionType) => {
            state.todos.push(action.payload)
        },
        toggleCompletedTodo: (state, action: ActionType<number>) => {
            const indexOfChangedTodo: number = state.todos.findIndex((todo) => todo.id === action.payload)

            state.todos[indexOfChangedTodo].completed = !state.todos[indexOfChangedTodo].completed
        },
        emptyRecycleBin: (state, action: ActionType<number[]>) => {
            action.payload.forEach((delete_id) => {
                const indexOfDeleteTodo = state.todos.findIndex((todo) => todo.id === delete_id)

                state.todos.splice(indexOfDeleteTodo, 1)
            })
        }
    },
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
            .addCase(addNewTodos.fulfilled, (state, action) => {
                action.payload.id = state.todos.length ? state.todos[state.todos.length - 1].id + 1 : action.payload.id
                state.todos.push(action.payload)
            })
    }
})

export default todoListSlice