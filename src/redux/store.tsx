import { configureStore } from "@reduxjs/toolkit"

import todoListSlice from "../components/TodoList/todoListSlice"
import recycleBinSlice from "../components/RecycleBin/recycleBinSlice"

const store = configureStore({
    reducer: {
        todoList: todoListSlice.reducer,
        recycleBin: recycleBinSlice.reducer
    }
})

export default store