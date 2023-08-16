import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { TodoType } from "../TodoList/Todo"

export type InitRecycleStateType = {
    recycles: TodoType[]
}

const initState: InitRecycleStateType = {
    recycles: [],
}

const recycleBinSlice = createSlice({
    name: "recycleBin",
    initialState: initState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.recycles.push(action.payload)
            })
            .addCase(removeAllTodo.fulfilled, (state, action) => {
                state.recycles.push(...action.payload)
            })
            .addCase(restoreTodo.fulfilled, (state, action) => {
                const indexOfRestoredTodo: number = state.recycles.findIndex((todo) => todo.id === action.payload.id)

                state.recycles.splice(indexOfRestoredTodo, 1)
            })
            .addCase(clearRecycleBin.fulfilled, (state) => {
                state.recycles.splice(0, state.recycles.length)
            })
    },
})


export const removeTodo = createAsyncThunk("recycles/removeTodo", async (todo: TodoType) => {
    try {
        const res = await fetch("api/removeTodo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
        })
        const data = await res.json()

        return data.recycle
    } catch (error) {
        return (error as Error).message
    }
})

export const restoreTodo = createAsyncThunk("recycles/restoreTodo", async (id: string) => {
    try {
        const res = await fetch("api/restoreTodo", {
            method: "DELETE",
            body: id
        })
        const data = await res.json()

        return data.recycle
    } catch (error) {
        return (error as Error).message
    }
})

export const removeAllTodo = createAsyncThunk("recycles/removeAllTodo", async (todos: TodoType[]) => {
    try {
        const res = await fetch("api/removeAllTodo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todos)
        })
        const data = await res.json()

        return data.recycles
    } catch (error) {
        return (error as Error).message
    }
})

export const clearRecycleBin = createAsyncThunk("recycles/clearRecycleBin", async (idList: string[]) => {
    try {
        const res = await fetch("api/clearRecycleBin", {
            method: "DELETE",
            body: JSON.stringify(idList)
        })
        const data = await res.json()

        return data
    } catch (error) {
        return (error as Error).message
    }
})

export default recycleBinSlice