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
    userInfo: null,
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
            state.userInfo = null
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
            .addCase(register.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true // registration successful
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
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
                state.userToken = localStorage.getItem('userToken')
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
