import { configureStore } from "@reduxjs/toolkit"

import todoListSlice from "../components/TodoList/todoListSlice"
import recycleBinSlice from "../components/RecycleBin/recycleBinSlice"
import usersSlice from "../components/UserSelect/userSelectSlice"

const store = configureStore({
    reducer: {
        todoList: todoListSlice.reducer,
        recycleBin: recycleBinSlice.reducer,
        users: usersSlice.reducer
    }
})

export default store