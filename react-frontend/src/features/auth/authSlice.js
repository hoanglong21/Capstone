import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import UserService from '../../services/UserService'
import { register, login } from './authAction'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userToken,
    error: null,
    success: null,
}

export const fetchUser = createAsyncThunk('/', async (id) => {
    const response = await UserService.getUser(id)
    return response.data
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // deletes token from storage
            state.loading = false
            state.userToken = null
            state.error = null
        },
    },
    extraReducers(builder) {
        builder
            // register user
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false
                state.success = true // registration successful
                state.error = null
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            // login user
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false
                state.userToken = localStorage.getItem('userToken')
                state.error = null
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
