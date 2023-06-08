import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogged: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isLogged = localStorage.getItem('token')
        },
        logout: (state) => {
            state.isLogged = localStorage.getItem('token')
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
