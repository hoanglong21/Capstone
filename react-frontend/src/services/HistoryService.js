import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createHistory = (history) => {
    return axios.post(API_BASE_URL + '/histories', history, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const filterHistory = (
    userId,
    destinationId,
    typeId,
    categoryId,
    fromDatetime,
    toDatetime,
    sortBy,
    direction,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterhistory?userid' +
            userId +
            '&destinationid' +
            destinationId +
            '&typeid' +
            typeId +
            '&categoryId' +
            categoryId +
            (fromDatetime ? `&fromdatetime=${fromDatetime}` : '') +
            (toDatetime ? `&todatetime=${toDatetime}` : '') +
            '&sortby' +
            sortBy +
            '&direction' +
            direction +
            '&page' +
            page +
            '&size' +
            size,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

const HistoryService = {
    createHistory,
    filterHistory,
}

export default HistoryService
