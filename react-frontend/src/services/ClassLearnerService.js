import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createClassLeaner = (classLearner) => {
    return axios.post(API_BASE_URL + '/classleaner', classLearner, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const deleteClassLearnerById = (id) => {
    return axios.delete(API_BASE_URL + '/delclasslearnerbyid/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const deleteClassLearner = (userId, classId) => {
    return axios.delete(
        API_BASE_URL +
            '/delclasslearner?userid=' +
            userId +
            '&classid=' +
            classId,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

const updateClassLeaner = (classLearner, id) => {
    return axios.put(API_BASE_URL + '/classleaner/' + id, classLearner, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const filterGetLeaner = (
    userId,
    classId,
    isAccepted,
    sortBy,
    direction,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filtergetlearner?userid' +
            userId +
            '&classid' +
            classId +
            '&accepted' +
            isAccepted +
            '&sortby' +
            sortBy +
            '&direction' +
            direction +
            'page' +
            page +
            'size' +
            size
    )
}

const filterClassLeaner = (
    userId,
    classId,
    fromcreated,
    tocreated,
    status,
    sortBy,
    direction,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterclasslearner?userid' +
            userId +
            '&classid' +
            classId +
            '&fromcreated' +
            fromcreated +
            '&tocreated' +
            tocreated +
            '&status' +
            status +
            '&sortby' +
            sortBy +
            '&direction' +
            direction +
            'page' +
            page +
            'size' +
            size
    )
}

const ClassLearnerService = {
    filterGetLeaner,
    createClassLeaner,
    deleteClassLearnerById,
    updateClassLeaner,
    deleteClassLearner,
    filterClassLeaner,
}

export default ClassLearnerService
