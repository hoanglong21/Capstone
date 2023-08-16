import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createClassroom = (newClass) => {
    return axios.post(API_BASE_URL + '/class', newClass)
}

const joinClass = (classCode, username) => {
    return axios.post(
        API_BASE_URL +
            '/joinclass?classCode=' +
            classCode +
            '&username=' +
            username
    )
}

const updateClassroom = (classRequest, id) => {
    return axios.put(API_BASE_URL + '/class/' + id, classRequest)
}

const deleteClass = (id) => {
    return axios.delete(API_BASE_URL + '/class/' + id)
}

const getClassroomById = (id) => {
    return axios.get(API_BASE_URL + '/class/' + id)
}

const getLeanerJoined = (id) => {
    return axios.get(API_BASE_URL + '/statistic/leanerjoinednum/' + id)
}

const getTestNumber = (id) => {
    return axios.get(API_BASE_URL + '/statistic/classtest/' + id)
}

const getAssignmentNumber = (id) => {
    return axios.get(API_BASE_URL + '/statistic/classassignment/' + id)
}

const resetClassCode = (id) => {
    return axios.post(API_BASE_URL + '/resetclasscode/' + id)
}

const getFilterList = (
    classId,
    isDeleted,
    search,
    author,
    learner,
    fromDeleted,
    toDeleted,
    fromCreated,
    toCreated,
    sortBy,
    direction,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterclass?classid' +
            classId +
            '&deleted' +
            isDeleted +
            '&search' +
            search +
            '&author' +
            author +
            '&learner' +
            learner +
            (fromDeleted ? `&fromdeleted${fromDeleted}` : '') +
            (toDeleted ? `&todeleted${toDeleted}` : '') +
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

const checkUserClass = (classId, userId) => {
    return axios.get(
        API_BASE_URL +
            '/checkuserclass?classId=' +
            classId +
            '&userId=' +
            userId
    )
}

const checkUserClassWaiting = (classId, userId) => {
    return axios.get(
        API_BASE_URL +
            '/checkuserclasswaiting?classId=' +
            classId +
            '&userId=' +
            userId
    )
}

const getLeanerJoinedGrowth = (id) => {
    return axios.get(API_BASE_URL + '/statistic/learnerjoinedgrowth/' + id)
}

const getPostGrowth = (id) => {
    return axios.get(API_BASE_URL + '/statistic/postgrowth/' + id)
}

const getFilterClassStudySet = (
    studysetassignid,
    studysetnotassignid,
    search,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/listclassstudyset?studysetassignid' +
            studysetassignid +
            '&studysetnotassignid' +
            studysetnotassignid +
            '&search' +
            search +
            '&page' +
            page +
            '&size' +
            size
    )
}

const addStudySetToClass = (classid, studysetid) => {
    return axios.post(
        API_BASE_URL +
            '/assignstudyset?classid=' +
            classid +
            '&studysetid=' +
            studysetid
    )
}

const ClassService = {
    createClassroom,
    getFilterList,
    joinClass,
    getClassroomById,
    updateClassroom,
    deleteClass,
    resetClassCode,
    getLeanerJoined,
    getTestNumber,
    getAssignmentNumber,
    checkUserClass,
    checkUserClassWaiting,
    getLeanerJoinedGrowth,
    getPostGrowth,
    getFilterClassStudySet,
    addStudySetToClass,
}

export default ClassService
