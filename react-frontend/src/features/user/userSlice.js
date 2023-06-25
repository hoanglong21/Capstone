import { createSlice } from '@reduxjs/toolkit'
import { changePassword, getUser, updateUser } from './userAction'

const initialState = {
    userInfo: {},
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
