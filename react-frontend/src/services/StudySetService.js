import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

class StudySetService {
    createStudySet(studySet) {
        return axios.post(API_BASE_URL + '/studysets', studySet)
    }

    updateStudySet(id, studySetDetails) {
        return axios.put(API_BASE_URL + '/studysets/' + id, studySetDetails)
    }
}

export default new StudySetService()
