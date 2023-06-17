import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import UserService from '../services/UserService'

const initialState = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('token')
        ? jwtDecode(localStorage.getItem('token')).sub
        : null,
    user: localStorage.getItem('token')
        ? (
              await UserService.getUser(
                  jwtDecode(localStorage.getItem('token')).sub
              )
          ).data
        : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.token = localStorage.getItem('token')
            state.username = jwtDecode(state.token).sub
        },
        logout: (state) => {
            state.token = localStorage.getItem('token')
            state.username = null
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
