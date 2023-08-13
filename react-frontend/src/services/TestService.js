import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createTest = (test) => {
    return axios.post(API_BASE_URL + '/test', test)
}

const updateTest = (id, test) => {
    return axios.put(API_BASE_URL + '/test/' + id, test)
}

const getTestById = (id) => {
    return axios.get(API_BASE_URL + '/test/' + id)
}

const deleteTest = (id) => {
    return axios.delete(API_BASE_URL + '/test/' + id)
}

const getFilterList = (
    search,
    author,
    fromStart,
    toStart,
    fromCreated,
    toCreated,
    draft,
    direction,
    sortBy,
    duration,
    classid,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filtertest?search' +
            search +
            '&author' +
            author +
            (fromStart ? `&fromstarted${fromStart}` : '') +
            (toStart ? `&tostarted${toStart}` : '') +
            (fromCreated ? `&fromcreated${fromCreated}` : '') +
            (toCreated ? `&tocreated${toCreated}` : '') +
            '&draft' +
            draft +
            '&direction' +
            direction +
            '&duration' +
            duration +
            '&sortby' +
            sortBy +
            '&classid' +
            classid +
            '&page' +
            page +
            '&size' +
            size
    )
}

const startTest = (userId, testId) => {
    return axios.get(
        API_BASE_URL + '/starttest?userid=' + userId + '&testid=' + testId
    )
}

const endTest = (testResultList) => {
    return axios.post(API_BASE_URL + '/endtest', testResultList)
}

const getNumAttemptTest = (testId, classId) => {
    return axios.get(
        API_BASE_URL +
            '/getattempttest?testid=' +
            testId +
            '&classid=' +
            classId
    )
}

const getTestLearner = (
    username,
    authorId,
    mark,
    direction,
    sortBy,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/gettestlearner?username' +
            username +
            '&authorid' +
            authorId +
            '&mark' +
            mark +
            '&direction' +
            direction +
            '&sortby' +
            sortBy +
            '&page' +
            page +
            '&size' +
            size
    )
}

const TestService = {
    getFilterList,
    createTest,
    updateTest,
    getTestById,
    deleteTest,
    startTest,
    endTest,
    getNumAttemptTest,
    getTestLearner,
}
export default TestService
