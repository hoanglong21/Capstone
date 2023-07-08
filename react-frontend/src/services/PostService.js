import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createPost = (post) => {
    return axios.post(API_BASE_URL + '/post', post)
}

const getAllPostByClassId = (id) => {
    return axios.get(API_BASE_URL + '/postbyclassid/' + id)
}

const PostService = {
    createPost,
    getAllPostByClassId,
}

export default PostService
