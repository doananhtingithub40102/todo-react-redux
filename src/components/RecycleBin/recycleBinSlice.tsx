import { createSlice } from "@reduxjs/toolkit"

import { TodoType } from "../TodoList/Todo"

const initState: TodoType[] = []

type ActionType<T = TodoType> = {
    type: string,
    payload: T
}

const recycleBinSlice = createSlice({
    name: "recycleBin",
    initialState: initState,
    reducers: {
        deleteTodo: (state, action: ActionType) => {
            state.push(action.payload)
        },
        clearAllTodo: (state, action: ActionType<TodoType[]>) => {
            state.push(...action.payload)
        },
        restoreTodo: (state, action: ActionType<string>) => {
            const indexOfRestoredTodo: number = state.findIndex((todo) => todo.id === action.payload)

            state.splice(indexOfRestoredTodo, 1)
        },
        emptyRecycleBin: (state) => {
            state.splice(0, state.length)
        }
    }
})

export default recycleBinSlice