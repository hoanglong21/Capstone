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

const TestService = {
    getFilterList,
    createTest,
    updateTest,
    getTestById,
    deleteTest,
}
export default TestService
