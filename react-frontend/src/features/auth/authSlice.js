import { createSlice } from '@reduxjs/toolkit'

import { register, login } from './authAction'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    userToken,
    error: null,
    success: null,
    loading: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.error = null
            state.success = null
        },
        logout: (state) => {
            state.userToken = null
            state.error = null
        },
    },
    extraReducers(builder) {
        builder
            // register user
            .addCase(register.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(register.fulfilled, (state) => {
                state.success = true // registration successful
                state.error = null
                state.loading = false
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })
            // login user
            .addCase(login.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(login.fulfilled, (state) => {
                state.userToken = localStorage.getItem('userToken')
                state.error = null
                state.success = true
                state.loading = false
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.error = payload
                state.success = false
                state.loading = false
            })
    },
})

export const { reset, logout } = authSlice.actions

export default authSlice.reducer
