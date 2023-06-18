import { createSlice } from '@reduxjs/toolkit'
import { getUser } from './userAction'

const initialState = {
    userInfo: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            state.userInfo = payload
        })
    },
})

export default userSlice.reducer
