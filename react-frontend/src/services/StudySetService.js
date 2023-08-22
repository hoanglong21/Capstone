import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createStudySet = (studySet) => {
    return axios.post(API_BASE_URL + '/studysets', studySet, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const updateStudySet = (id, studySetDetails) => {
    return axios.put(API_BASE_URL + '/studysets/' + id, studySetDetails, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const deleteStudySet = (id) => {
    return axios.delete(API_BASE_URL + '/studysets/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const deleteHardStudySet = (id) => {
    return axios.delete(API_BASE_URL + '/deletestudysets/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getStudySetById = (id) => {
    return axios.get(API_BASE_URL + '/studysets/' + id)
}

const checkStudySet = (id) => {
    return axios.get(API_BASE_URL + '/checkstudyset/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getAllStudySetByUser = (username) => {
    return axios.get(API_BASE_URL + '/studysetAuthor/' + username)
}

const getFilterListByClass = (
    authorId,
    search,
    classId,
    categoryId,
    assigned,
    sortBy,
    direction,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterstudysetsclass?author_id' +
            authorId +
            '&search' +
            search +
            '&class_id' +
            classId +
            '&category_id' +
            categoryId +
            '&assigned' +
            assigned +
            '&sortby' +
            sortBy +
            '&direction' +
            direction +
            '&page' +
            page +
            '&size' +
            size
    )
}

const getFilterList = (
    is_deleted,
    is_public,
    is_draft,
    search,
    authorUsername,
    authorName,
    type,
    fromDeteted,
    toDeteted,
    fromCreated,
    toCreated,
    sortBy,
    direction,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterstudysets?deleted' +
            is_deleted +
            '&public' +
            is_public +
            '&draft' +
            is_draft +
            '&search' +
            search +
            '&author_username' +
            authorUsername +
            '&author_name' +
            authorName +
            '&type' +
            type +
            (fromDeteted ? `&fromdeteted${fromDeteted}` : '') +
            (toDeteted ? `&todeteted${toDeteted}` : '') +
            (fromCreated ? `&fromcreated${fromCreated}` : '') +
            (toCreated ? `&tocreated${toCreated}` : '') +
            '&sortby' +
            sortBy +
            '&direction' +
            direction +
            '&page' +
            page +
            '&size' +
            size
    )
}

const getQuizByStudySetId = (id, type, number, userId, star) => {
    return axios.get(
        API_BASE_URL +
            '/quiz?id=' +
            id +
            '&type=' +
            type +
            '&number=' +
            number +
            '&userid=' +
            userId +
            '&star=' +
            star
    )
}

const countCardInSet = (userId, studySetId) => {
    return axios.get(
        API_BASE_URL +
            '/countinfoset?userid=' +
            userId +
            '&studysetid=' +
            studySetId
    )
}

const getLearningStudySetId = (
    userId,
    studySetId,
    questionType,
    progressType,
    isRandom,
    star
) => {
    return axios.get(
        API_BASE_URL +
            '/learn?userid=' +
            userId +
            '&studysetid=' +
            studySetId +
            '&questiontype=' +
            questionType +
            '&progresstype=' +
            progressType +
            '&random=' +
            isRandom +
            '&star=' +
            star
    )
}

const recoverStudySet = (id) => {
    return axios.get(API_BASE_URL + '/recoverstudysets/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const StudySetService = {
    createStudySet,
    updateStudySet,
    deleteStudySet,
    getStudySetById,
    checkStudySet,
    getAllStudySetByUser,
    getFilterList,
    getQuizByStudySetId,
    countCardInSet,
    getLearningStudySetId,
    getFilterListByClass,
    deleteHardStudySet,
    recoverStudySet,
}

export default StudySetService
