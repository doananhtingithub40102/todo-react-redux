import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"

import todosRemainingSelector from "../../redux/selectors"
import { todosStatusSelector, todosErrorSelector, usersSelector, selectedUserSelector } from "../../redux/selectors"
import { addNewTodos, getTodosByUserId } from "./todoListSlice"
import recycleBinSlice from "../RecycleBin/recycleBinSlice"
import usersSlice from "../UserSelect/userSelectSlice"

import { TodoType } from "./Todo"
import Todo from "./Todo"

const TodoList = () => {
  const [todoTitle, setTodoTitle] = useState("")

  const dispatch = useDispatch()

  const todoList = useSelector(todosRemainingSelector)
  const todosStatus = useSelector(todosStatusSelector)
  const todosError = useSelector(todosErrorSelector)
  const users = useSelector(usersSelector)
  const selectedUser = useSelector(selectedUserSelector)

  const user = selectedUser === -1 ? "" : selectedUser + 1

  const handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(getTodosByUserId(parseInt(e.target.value)) as unknown as AnyAction)
    dispatch(usersSlice.actions.selectUser(parseInt(e.target.value)))
    dispatch(recycleBinSlice.actions.emptyRecycleBin())
  }

  let content
  if (todosStatus === "idle" || !user) {
    content = <p>No data</p>
  } else if (todosStatus === "loadingTodos") {
    content = <p>Loading...</p>
  } else if (todosStatus === "succeeded" || todosStatus === "loadingChecked") {
    content = todoList.map((todo: TodoType) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
        />
      )
    })
  } else if (todosStatus === "failed") {
    content = <p>{todosError}</p>
  }

  const handleAddTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (todoTitle.trim() === "") {
      return
    }

    dispatch(addNewTodos({
      userId: user as number,
      title: todoTitle,
      completed: false
    }) as unknown as AnyAction)

    setTodoTitle("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value)
  }

  const handleAllTodosClear = () => dispatch(recycleBinSlice.actions.clearAllTodo(todoList))

  return (
    <>
      <div id="overlay" style={{ display: todosStatus === "addingTodo" ? "block" : "none" }}>
        <div className="spinner"></div>
        <p>Adding todo...</p>
      </div>
      <main className="main main--todoList">
        <div className="newItemEntry">
          <form
            className="newItemEntry__form"
            style={{ display: user ? "flex" : "none" }}
            id="itemEntryForm"
            onSubmit={handleAddTodoSubmit}
            hidden={!user ? true : true}
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
              required
            />
            <button
              type="submit"
              id="addItem"
              className="newItemEntry__button"
              title="Add new todo to list">
              +
            </button>
          </form>
          {/* User Selection */}
          <div>
            <h2>User</h2>
            <select value={user} onChange={handleChangeUser} className="users__select">
              <option value="">Select user</option>
              {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
          </div>
        </div>
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
        <div className="todoList">
          {content}
        </div>
      </main>
    </>
  )
}

export default TodoList