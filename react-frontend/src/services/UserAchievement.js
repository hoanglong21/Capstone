import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

export const getUserAchievementByUserId = (id) => {
    return axios.get(API_BASE_URL + '/userachievementsbyuser/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const UserAchievementService = {
    getUserAchievementByUserId,
}

export default UserAchievementService
