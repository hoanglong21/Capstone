import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1/chat'

const findAllName = (user) => {
    return axios.get(API_BASE_URL + '/users?username=' + user)
}

const ChatService = {
    findAllName,
}

export default ChatService
