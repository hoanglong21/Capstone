import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

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

const getFilterList = (
    is_deleted,
    is_public,
    is_draft,
    search,
    authorId,
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
            '&author_id' +
            authorId +
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

const StudySetService = {
    createStudySet,
    updateStudySet,
    deleteStudySet,
    getStudySetById,
    checkStudySet,
    getAllStudySetByUser,
    getFilterList,
}

export default StudySetService
