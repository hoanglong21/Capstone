import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getKanji = (page, size, search) => {
    return axios.get(
        API_BASE_URL +
            '/kanji?page' +
            page +
            '&size' +
            size +
            '&search' +
            search
    )
}

const getVocabulary = (page, size, search) => {
    return axios.get(
        API_BASE_URL +
            '/vocabulary?page' +
            page +
            '&size' +
            size +
            '&search' +
            search
    )
}

const DictionaryService = {
    getKanji,
    getVocabulary,
}
export default DictionaryService
