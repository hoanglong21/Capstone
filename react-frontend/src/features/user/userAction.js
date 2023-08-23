import { createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import UserService from '../../services/UserService'
import UserSettingService from '../../services/UserSettingService'

export const getUser = createAsyncThunk('user/getUser', async (userToken) => {
    const username = jwtDecode(userToken).sub
    const tempUser = (await UserService.getUser(username)).data
    const tempLanguage = (await UserSettingService.customSettings(tempUser.id))
        .data.language
    return { user: tempUser, language: tempLanguage }
})

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userDetails, { rejectWithValue }) => {
        try {
            const response = await UserService.updateUser(
                userDetails.username,
                userDetails
            )
            return response.data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
