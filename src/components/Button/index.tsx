type PropsType = {
    text: string,
    onClick: () => void
}

const Button = ({ text, onClick }: PropsType) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

export default Button