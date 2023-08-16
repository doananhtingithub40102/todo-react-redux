import { useState } from "react"
import { useDispatch } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"

import { toggleCompletedTodo } from "./todoListSlice"
import { removeTodo } from "../RecycleBin/recycleBinSlice"

export type TodoType = {
    userId: number,
    id: string,
    title: string,
    completed: boolean
}

type PropsType = {
    src: string,
    todo: TodoType
}

const Todo = ({ src, todo }: PropsType) => {
    const [completed, setCompleted] = useState(todo.completed)

    const dispatch = useDispatch()

    const handleCheckboxChange = () => {
        setCompleted(!completed)
        dispatch(toggleCompletedTodo(todo.id) as unknown as AnyAction)
    }

    const handleTodoRemove = () => dispatch(removeTodo(todo) as unknown as AnyAction)

    return (
        <article className="todo">
            <h3>{todo.title}</h3>
            <img src={src} alt={todo.title} className="todo__img" />
            <p>
                Checked:&nbsp;
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleCheckboxChange}
                />
            </p>
            <button
                title="Remove this todo"
                onClick={handleTodoRemove}
            >
                Remove ❌
            </button>
        </article>
    )
}

export default Todo