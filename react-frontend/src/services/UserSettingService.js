import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

export const getUserSettingByUserId = (id) => {
    return axios.get(API_BASE_URL + '/usersettingsbyuserid/' + id)
}

const UserSettingService = {
    getUserSettingByUserId,
}

export default UserSettingService
