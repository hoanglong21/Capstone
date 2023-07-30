import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const findAllName = (user) => {
    return axios.get(API_BASE_URL + '/otherusers/' + user, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const ChatService = {
    findAllName,
}

export default ChatService
