import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

export const customSettings = (id) => {
    return axios.get(API_BASE_URL + '/customsettings/' + id)
}

export const updateCustomSettings = (userId, settingId, value) => {
    return axios.get(
        API_BASE_URL +
            '/customsettings?userid=' +
            userId +
            '&settingid=' +
            settingId +
            '&value=' +
            value
    )
}

const UserSettingService = {
    customSettings,
    updateCustomSettings,
}

export default UserSettingService
