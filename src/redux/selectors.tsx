import { createSelector } from "@reduxjs/toolkit"

import { InitStateType } from "../components/TodoList/todoListSlice"
import { TodoType } from "../components/TodoList/Todo"

type StateType = {
    todoList: InitStateType,
    recycleBin: TodoType[]
}

export const todoListSelector = (state: StateType) => state.todoList.todos
export const todosStatusSelector = (state: StateType) => state.todoList.status
export const todosErrorSelector = (state: StateType) => state.todoList.error
export const recycleBinSelector = (state: StateType) => state.recycleBin

const todosRemainingSelector = createSelector(todoListSelector, recycleBinSelector, (todoList, recycleBin) => {
    const idList: number[] = recycleBin.map((todo) => todo.id)

    return todoList.filter((todo) => !idList.includes(todo.id))
})

export default todosRemainingSelector