import { useSelector } from "react-redux"

import { recycleBinSelector } from "../../redux/selectors"

import Nav from "./Nav"

type PropsType = {
  viewTodoList: boolean,
  setViewTodoList: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ viewTodoList, setViewTodoList }: PropsType) => {
  const RecycleBin_size: number = useSelector(recycleBinSelector).length

  return (
    <header className="header">
      <div className="header__title-bar">
        <h1>My Todo List</h1>
        {
          viewTodoList &&
          <div className="header__price-box">
            <p>RecycleBin size: {RecycleBin_size}</p>
          </div>
        }
      </div>
      <Nav viewTodoList={viewTodoList} setViewTodoList={setViewTodoList} />
    </header>
  )
}

export default Header