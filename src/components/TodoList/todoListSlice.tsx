import { v4 as uuidv4 } from "uuid"
import { createSlice } from "@reduxjs/toolkit"

import { TodoType } from "./Todo"

const initState: TodoType[] = [
    {
        id: uuidv4(),
        title: "Learn React, Redux",
        completed: true
    },
    {
        id: uuidv4(),
        title: "Learn TypeScript",
        completed: true
    },
    {
        id: uuidv4(),
        title: "Learn Next.js",
        completed: false
    }
]

type ActionType<T = TodoType> = {
    type: string,
    payload: T
}

const todoListSlice = createSlice({
    name: "todoList",
    initialState: initState,
    reducers: {
        addTodo: (state, action: ActionType) => {
            state.push(action.payload)
        },
        toggleCompletedTodo: (state, action: ActionType<string>) => {
            const indexOfChangedTodo: number = state.findIndex((todo) => todo.id === action.payload)

            state[indexOfChangedTodo].completed = !state[indexOfChangedTodo].completed
        },
        emptyRecycleBin: (state, action: ActionType<string[]>) => {
            action.payload.forEach((delete_id) => {
                const indexOfDeleteTodo = state.findIndex((todo) => todo.id === delete_id)

                state.splice(indexOfDeleteTodo, 1)
            })
        }
    }
})

export default todoListSlice