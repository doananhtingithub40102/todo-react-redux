import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"

import { fetchUsers } from "./components/UserSelect/userSelectSlice"

import Header from "./components/Header"
import TodoList from "./components/TodoList"
import RecycleBin from "./components/RecycleBin"
import Footer from "./components/Footer"

function App() {
  const [viewTodoList, setViewTodoList] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers() as unknown as AnyAction)
  }, [])

  return (
    <>
      <Header viewTodoList={viewTodoList} setViewTodoList={setViewTodoList} />

      {viewTodoList ? <TodoList /> : <RecycleBin />}

      <Footer viewTodoList={viewTodoList} />
    </>
  )
}

export default App
