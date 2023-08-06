import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const getFieldsByStudySetTypeId = (studySetId) => {
    return axios.get(API_BASE_URL + '/fieldbystudyset/' + studySetId, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const FieldService = {
    getFieldsByStudySetTypeId,
}

export default FieldService
