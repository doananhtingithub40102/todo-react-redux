import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { recycleBinSelector } from "../../redux/selectors"
import todoListSlice from "../TodoList/todoListSlice"
import recycleBinSlice from "./recycleBinSlice"

import { TodoType } from "../TodoList/Todo"
import RecycleBinLineTodo from "./RecycleBinLineTodo"

const RecycleBin = () => {
  const [empty, setEmpty] = useState(false)

  const recycleBin = useSelector(recycleBinSelector)

  const dispatch = useDispatch()

  const handleRecycleBinEmpty = () => {
    setEmpty(true)

    const idList: number[] = recycleBin.map((todo) => todo.id)

    dispatch(todoListSlice.actions.emptyRecycleBin(idList))
    dispatch(recycleBinSlice.actions.emptyRecycleBin())
  }

  return (
    <main className="main main--recycleBin">
      {empty ?
        <h2>RecycleBin is empty</h2> :

        <>
          <h2 className="offscreen">RecyleBin</h2>
          <ul className="recycleBin">
            {recycleBin.map((todo: TodoType) => {
              return (
                <RecycleBinLineTodo
                  key={todo.id}
                  todo={todo}
                />
              )
            })}
          </ul>
          <div className="recycleBin__totals">
            <p>RecycleBin size: {recycleBin.length}</p>
            <button
              className="recycleBin__submit"
              disabled={!recycleBin.length}
              onClick={handleRecycleBinEmpty}
            >
              Empty RecycleBin
            </button>
          </div>
        </>
      }
    </main>
  )
}

export default RecycleBin