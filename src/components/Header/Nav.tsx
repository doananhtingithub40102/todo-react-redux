import Button from "../Button"

type PropsType = {
    viewTodoList: boolean,
    setViewTodoList: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({ viewTodoList, setViewTodoList }: PropsType) => {
    return (
        <nav className="nav">
            {viewTodoList ?
                <Button text="RecycleBin 🗑" onClick={() => setViewTodoList(false)} />
                :

                <Button text="Todo List ☑️" onClick={() => setViewTodoList(true)} />}
        </nav>
    )
}

export default Nav