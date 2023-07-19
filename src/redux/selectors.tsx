import { createSelector } from "@reduxjs/toolkit"

import { TodoType } from "../components/TodoList/Todo"

type StateType = {
    todoList: TodoType[],
    recycleBin: TodoType[]
}

type SelectorType = (state: StateType) => TodoType[]

export const todoListSelector: SelectorType = (state) => state.todoList
export const recycleBinSelector: SelectorType = (state) => state.recycleBin

const todosRemainingSelector = createSelector(todoListSelector, recycleBinSelector, (todoList, recycleBin) => {
    const idList: string[] = recycleBin.map((todo) => todo.id)

    return todoList.filter((todo) => !idList.includes(todo.id))
})

export default todosRemainingSelector