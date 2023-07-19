import { useDispatch } from "react-redux"

import recycleBinSlice from "./recycleBinSlice"

import { TodoType } from "../TodoList/Todo"

type PropsType = {
  src: string,
  todo: TodoType
}

const RecycleBinLineTodo = ({ src, todo }: PropsType) => {
  const dispatch = useDispatch()

  const handleTodoRestore = () => dispatch(recycleBinSlice.actions.restoreTodo(todo.id))

  return (
    <li className="recycleBin__item">
      <img src={src} alt={todo.title} className="recycleBin__img" />
      <div>{todo.title}</div>
      <div>
        Checked:&nbsp;
        <input type="checkbox" checked={todo.completed} readOnly={true} />
      </div>
      <button
        className="recycleBin__button"
        title="Restore this todo"
        onClick={handleTodoRestore}
      >
        ♻️
      </button>
    </li>
  )
}

export default RecycleBinLineTodo