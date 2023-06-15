import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.token = localStorage.getItem('token')
        },
        logout: (state) => {
            state.token = localStorage.getItem('token')
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
