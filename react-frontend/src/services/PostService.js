import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createPost = (post) => {
    return axios.post(API_BASE_URL + '/post', post)
}

const PostService = {
    createPost,
}

export default PostService
