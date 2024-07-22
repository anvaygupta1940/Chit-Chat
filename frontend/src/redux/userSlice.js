import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        authUser: null,
        otherUsers: null,
        selectedUser: null,
        onlineUsers: null
    },
    reducers: {
        setUser: (state, action) => {
            state.authUser = action.payload;
        },
        logout: (state, action) => {
            state.authUser = null;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser, logout, setOtherUsers, setSelectedUser, setOnlineUsers } = userSlice.actions

export default userSlice.reducer