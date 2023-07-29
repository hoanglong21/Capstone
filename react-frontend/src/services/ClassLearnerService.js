import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

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
            '/filtergetleaner?userid' +
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

const ClassLearnerService = {
    filterGetLeaner,
}

export default ClassLearnerService
