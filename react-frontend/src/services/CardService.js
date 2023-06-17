import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

class CardService {
    createCard(card) {
        return axios.post(API_BASE_URL + '/cards', card)
    }

    updateCard(id, cardDetails) {
        return axios.post(API_BASE_URL + '/cards/' + id, cardDetails)
    }
}

export default new CardService()
