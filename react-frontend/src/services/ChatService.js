import axios from 'axios';


const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/chat";

class ChatService {
    findAllName(user) {
        return axios.get(AUTH_API_BASE_URL + "/users?username=" + user);
    }
}

export default new ChatService()