import { useState } from "react"

import Header from "./components/Header"
import TodoList from "./components/TodoList"
import RecycleBin from "./components/RecycleBin"
import Footer from "./components/Footer"

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
