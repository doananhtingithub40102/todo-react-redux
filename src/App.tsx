import { useState } from "react"

import configureMirage from "./fakeApis"

import Header from "./components/Header"
import TodoList from "./components/TodoList"
import RecycleBin from "./components/RecycleBin"
import Footer from "./components/Footer"

if (process.env.NODE_ENV === "development") {
  configureMirage()
}

function App() {
  const [viewTodoList, setViewTodoList] = useState(true)

  return (
    <>
      <Header viewTodoList={viewTodoList} setViewTodoList={setViewTodoList} />

      {viewTodoList ? <TodoList /> : <RecycleBin />}

      <Footer viewTodoList={viewTodoList} />
    </>
  )
}

export default App
