import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createNotification = (notification) => {
    return axios.post(API_BASE_URL + '/notification', notification, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const NotificationService = {
    createNotification,
}

export default NotificationService
