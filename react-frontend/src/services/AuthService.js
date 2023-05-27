import axios from 'axios';


const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/auth";

class AuthService {
    registration(user) {
        return axios.post(AUTH_API_BASE_URL + "/register", user);
    }

    
    login(user) {
        return axios.post(AUTH_API_BASE_URL + "/login", user);
    }

    logout() {
        // return axios.get(AUTH_API_BASE_URL + "/logout");
        localStorage.removeItem("token");
        
    }
}

export default new AuthService()