import { createSelector } from "@reduxjs/toolkit"

import { InitTodoStateType } from "../components/TodoList/todoListSlice"
import { InitRecycleStateType } from "../components/RecycleBin/recycleBinSlice"

type StateType = {
    todoList: InitTodoStateType,
    recycleBin: InitRecycleStateType
}

export const todoListSelector = (state: StateType) => state.todoList.todos
export const todosStatusSelector = (state: StateType) => state.todoList.status
export const todosErrorSelector = (state: StateType) => state.todoList.error

export const recycleBinSelector = (state: StateType) => state.recycleBin.recycles

const todosRemainingSelector = createSelector(todoListSelector, recycleBinSelector, (todoList, recycleBin) => {
    const idList: string[] = recycleBin.map((todo) => todo.id)
    return todoList.filter((todo) => !idList.includes(todo.id))
})

export default todosRemainingSelector