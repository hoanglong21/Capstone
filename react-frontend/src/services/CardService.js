import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createCard = (card) => {
    return axios.post(API_BASE_URL + '/cards', card)
}

const updateCard = (id, cardDetails) => {
    return axios.post(API_BASE_URL + '/cards/' + id, cardDetails)
}

const CardService = {
    createCard,
    updateCard,
}

export default CardService
