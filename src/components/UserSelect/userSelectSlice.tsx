import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const USERS_URL: string = "https://jsonplaceholder.typicode.com/users"

type UserType = {
    id: number,
    name: string,
    isSelected: boolean
}

export type InitUsersStateType = {
    users: UserType[],
    error: string | null
}

const initState: InitUsersStateType = {
    users: [],
    error: null
}

const usersSlice = createSlice({
    name: "users",
    initialState: initState,
    reducers: {
        selectUser: (state, action: { type: string, payload: number }) => {
            state.users.forEach(user => user.isSelected = false)
            if (action.payload) state.users[action.payload - 1].isSelected = true
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload.map((user: any) => ({ id: user.id, name: user.name }))
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message as string
            })
    },
})

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    try {
        const res = await fetch(USERS_URL)
        let data = await res.json()

        return data
    } catch (error) {
        return (error as Error).message
    }
})

export default usersSlice