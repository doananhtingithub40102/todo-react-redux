import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons"

import { toggleCompletedTodo } from "./todoListSlice"
import recycleBinSlice from "../RecycleBin/recycleBinSlice"
import { todosStatusSelector } from "../../redux/selectors"

export type TodoType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

type PropsType = {
    todo: TodoType
}

const Todo = ({ todo }: PropsType) => {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const todosStatus = useSelector(todosStatusSelector)

    const handleToggleTodo = () => {
        dispatch(toggleCompletedTodo({ todoId: todo.id, completed: todo.completed }) as unknown as AnyAction)
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }

    const handleTodoDelete = () => dispatch(recycleBinSlice.actions.deleteTodo(todo))

    return (
        <div className="todo">
            <div className="listItems">
                <div>
                    {todo.completed ?
                        <p><big><del>{todo.title}</del></big></p> :
                        <h3>{todo.title}</h3>}
                    <button onClick={handleToggleTodo}>
                        Checked &nbsp;
                        {todosStatus === "loadingChecked" && isLoading ?
                            <span className="btnLoader"></span> :
                            todo.completed ?
                                <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#888888" }} /> :
                                <FontAwesomeIcon icon={faSquare} style={{ color: "lightgray", border: "1px solid black", borderRadius: "3px" }} />}
                    </button>
                </div>
                <button
                    title="Delete this todo"
                    onClick={handleTodoDelete}
                    className="delete__button"
                >
                    Delete ❌
                </button>
            </div>
        </div>
    )
}

export default Todo