import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getFilterList = (
    search,
    author,
    from,
    to,
    draft,
    direction,
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
            (from ? `&from${from}` : '') +
            (to ? `&to${to}` : '') +
            '&draft' +
            draft +
            '&direction' +
            direction +
            '&duration' +
            duration +
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
}
export default TestService
