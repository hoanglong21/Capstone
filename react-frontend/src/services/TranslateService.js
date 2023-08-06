import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST + '/translate'

const translateClients5 = (text, to) => {
    return axios.get(API_BASE_URL + '/clients5?text=' + text + '&to=' + to)
}

const translateGoogleapis = (text, to) => {
    return axios.get(API_BASE_URL + '/googleapis?text=' + text + '&to=' + to)
}

const translateMymemory = (text, to) => {
    return axios.get(API_BASE_URL + '/mymemory?text=' + text + '&to=' + to)
}

const TranslateService = {
    translateClients5,
    translateGoogleapis,
    translateMymemory,
}
export default TranslateService
