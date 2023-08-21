import { createSlice } from '@reduxjs/toolkit'
import { getNumUnread } from './notifyAction'

const initialState = {
    numUnread: null,
    error: null,
    success: null,
}

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    extraReducers(builder) {
        builder
            // get user
            .addCase(getNumUnread.fulfilled, (state, { payload }) => {
                state.numUnread = payload
            })
    },
})

export const { reset, logout } = notifySlice.actions

export default notifySlice.reducer
