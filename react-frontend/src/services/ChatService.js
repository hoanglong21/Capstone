import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1/chat'

class ChatService {
    findAllName(user) {
        return axios.get(API_BASE_URL + '/users?username=' + user)
    }
}

export default new ChatService()
