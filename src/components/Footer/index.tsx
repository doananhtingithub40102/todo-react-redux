import { useSelector } from "react-redux"

import todosRemainingSelector from "../../redux/selectors"

type PropsType = {
  viewTodoList: boolean
}

const Footer = ({ viewTodoList }: PropsType) => {
  const year: number = new Date().getFullYear()

  const todoList_size: number = useSelector(todosRemainingSelector).length

  return (
    <footer className="footer">
      {!viewTodoList ?
        <p>TodoApp &copy; {year}</p> :

        <>
          <p>Total Todos: {todoList_size}</p>
          <p>TodoApp &copy; {year}</p>
        </>
      }
    </footer>
  )
}

export default Footer