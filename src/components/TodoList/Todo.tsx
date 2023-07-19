import { useState } from "react"
import { useDispatch } from "react-redux"

import todoListSlice from "./todoListSlice"
import recycleBinSlice from "../RecycleBin/recycleBinSlice"

export type TodoType = {
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
        dispatch(todoListSlice.actions.toggleCompletedTodo(todo.id))
    }

    const handleTodoDelete = () => dispatch(recycleBinSlice.actions.deleteTodo(todo))

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
                title="Delete this todo"
                onClick={handleTodoDelete}
            >
                Delete ❌
            </button>
        </article>
    )
}

export default Todo