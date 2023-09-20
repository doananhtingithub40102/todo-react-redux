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
    status: "idle", // "idle" | "loadingTodos" | "succeeded" | "failed"
    error: null
}

type ActionType<T = TodoType> = {
    type: string,
    payload: T
}

export const getTodosByUserId = createAsyncThunk("todos/getTodosByUserId", async (userId: number) => {
    if (!userId) return []

    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        let data = await res.json()

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

export const toggleCompletedTodo = createAsyncThunk("todos/toggleCompletedTodo", async (arg: { todoId: number, completed: boolean }) => {
    try {
        const res = await fetch(`${TODOS_URL}/${arg.todoId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "completed": !arg.completed })
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
        emptyRecycleBin: (state, action: ActionType<number[]>) => {
            action.payload.forEach((delete_id) => {
                const indexOfDeleteTodo = state.todos.findIndex((todo) => todo.id === delete_id)

                state.todos.splice(indexOfDeleteTodo, 1)
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getTodosByUserId.pending, (state) => {
                state.status = "loadingTodos"
            })
            .addCase(getTodosByUserId.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.todos = [...action.payload].sort((todoA, todoB) => todoB.id - todoA.id)
            })
            .addCase(getTodosByUserId.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message as string
            })
            .addCase(addNewTodos.pending, (state) => {
                state.status = "addingTodo"
            })
            .addCase(addNewTodos.fulfilled, (state, action) => {
                state.status = "succeeded"
                action.payload.id = state.todos.length ? state.todos[0].id + 1 : action.payload.id
                state.todos = [action.payload, ...state.todos]
            })
            .addCase(toggleCompletedTodo.pending, (state) => {
                state.status = "loadingChecked"
            })
            .addCase(toggleCompletedTodo.fulfilled, (state, action) => {
                state.status = "succeeded"
                const indexOfChangedTodo: number = state.todos.findIndex((todo) => todo.id === action.payload.id)

                state.todos[indexOfChangedTodo].completed = action.payload.completed
            })
    }
})

export default todoListSlice