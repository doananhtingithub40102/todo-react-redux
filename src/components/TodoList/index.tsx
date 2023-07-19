import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"

import todosRemainingSelector from "../../redux/selectors"
import todoListSlice from "./todoListSlice"
import recycleBinSlice from "../RecycleBin/recycleBinSlice"

import { TodoType } from "./Todo"
import Todo from "./Todo"

function getImageURL(index: number) {
  let theme_id: number

  if (index % 3 === 0) {
    theme_id = 1
  } else if ((index - 1) % 3 === 0) {
    theme_id = 2
  } else {
    theme_id = 3
  }

  return new URL(`../../images/theme_${theme_id}.jpg`, import.meta.url).href
}

const TodoList = () => {
  const [todoTitle, setTodoTitle] = useState("")

  const dispatch = useDispatch()

  const todoList = useSelector(todosRemainingSelector)

  const handleAddTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (todoTitle.trim() === "") {
      return
    }

    dispatch(todoListSlice.actions.addTodo({
      id: uuidv4(),
      title: todoTitle,
      completed: false
    }))

    setTodoTitle("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value)
  }

  const handleAllTodosClear = () => dispatch(recycleBinSlice.actions.clearAllTodo(todoList))

  return (
    <main className="main main--todoList">
      <div className="newItemEntry">
        <form
          className="newItemEntry__form"
          id="itemEntryForm"
          onSubmit={handleAddTodoSubmit}
        >
          <input
            className="newItemEntry__input"
            id="newItem"
            type="text"
            maxLength={40}
            autoComplete="off"
            placeholder="Add todo"
            value={todoTitle}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            id="addItem"
            className="newItemEntry__button"
            title="Add new todo to list">

            +
          </button>
        </form>
      </div>

      <div className="listContainer">
        <div>
          <header className="listHeader">
            <h2 id="listName">List</h2>
            <button
              id="clearTodosButton"
              title="Remove all todos from the list"
              onClick={handleAllTodosClear}
            >

              Clear All
            </button>
          </header>
          <hr />
        </div>

        <div className="todoList">
          {todoList.map((todo: TodoType, index: number) => {
            return (
              <Todo
                key={todo.id}
                src={getImageURL(index)}
                todo={todo}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default TodoList