import { createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'

export const register = createAsyncThunk(
    'auth/register',
    async (user, { rejectWithValue }) => {
        try {
            await AuthService.registration(user)
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (user, { rejectWithValue }) => {
        try {
            const userToken = (await AuthService.login(user)).data
            // store user's token in local storage
            localStorage.setItem('userToken', userToken)
            const username = jwtDecode(userToken).sub
            const userInfo = (await UserService.getUser(username)).data
            return userInfo
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
