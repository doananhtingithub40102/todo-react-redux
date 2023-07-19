import { createSlice } from "@reduxjs/toolkit"

import { TodoType } from "./Todo"

const initState: TodoType[] = [
    {
        id: "todo0001",
        title: "rap việt mùa 3 tập 8",
        completed: false
    },
    {
        id: "todo0002",
        title: "học redux qua todo project",
        completed: false
    },
    {
        id: "todo0003",
        title: "rap việt mùa 3 tập 7",
        completed: true
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