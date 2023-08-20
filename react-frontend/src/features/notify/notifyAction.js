import { createAsyncThunk } from '@reduxjs/toolkit'

import NotificationService from '../../services/NotificationService'

export const getNumUnread = createAsyncThunk(
    'notify/getNumUnread',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await NotificationService.getFilterNotification(
                '',
                `=0`,
                '',
                '',
                '',
                `=${userId}`,
                '',
                `=1`,
                '=10'
            )
            return response.data.totalItems
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
