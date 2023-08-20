import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createNotification = (notification) => {
    return axios.post(API_BASE_URL + '/notification', notification)
}

const updateNotification = (id, notification) => {
    return axios.put(API_BASE_URL + '/notification/' + id, notification)
}

const markAsRead = (id) => {
    return axios.get(API_BASE_URL + '/markasread/' + id)
}

const getFilterNotification = (
    content,
    isRead,
    title,
    fromDatetime,
    toDatetime,
    userid,
    direction,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filternotification?content' +
            content +
            '&isread' +
            isRead +
            '&title' +
            title +
            '&fromdatetime' +
            fromDatetime +
            '&todatetime' +
            toDatetime +
            '&userid' +
            userid +
            '&direction' +
            direction +
            '&page' +
            page +
            '&size' +
            size
    )
}

const NotificationService = {
    createNotification,
    getFilterNotification,
    updateNotification,
    markAsRead,
}

export default NotificationService
