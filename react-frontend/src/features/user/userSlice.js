import { createSlice } from '@reduxjs/toolkit'
import {
    getUser,
    updateUser,
} from './userAction'

const initialState = {
    userInfo: {},
    defaultAvatar: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.userInfo = payload
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.userInfo = payload
            })
    },
})

export default userSlice.reducer
