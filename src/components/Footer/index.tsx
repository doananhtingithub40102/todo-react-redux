import { useSelector } from "react-redux"

import todosRemainingSelector from "../../redux/selectors"

type PropsType = {
  viewTodoList: boolean
}

const Footer = ({ viewTodoList }: PropsType) => {
  const year: number = new Date().getFullYear()

  const completedTodos = useSelector(todosRemainingSelector).filter(todo => todo.completed).length
  const totalTodos: number = useSelector(todosRemainingSelector).length

  return (
    <footer className="footer">
      {!viewTodoList ?
        <p>TodoApp &copy; {year}</p> :

        <>
          <p>Done {completedTodos}/{totalTodos} todos</p>
          <p>TodoApp &copy; {year}</p>
        </>
      }
    </footer>
  )
}

export default Footer