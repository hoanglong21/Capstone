import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createPost = (post, filename, type, url, file_type) => {
    return axios.post(
        API_BASE_URL +
            '/post?filename' +
            filename +
            '&type' +
            type +
            '&fileurl' +
            url +
            '&filetype' +
            file_type,
        post
    )
}

const updatePost = (id, post, filename, type, fileurl, filetype) => {
    return axios.put(
        API_BASE_URL +
            '/post/' +
            id +
            '?filename' +
            filename +
            '&type' +
            type +
            '&fileurl' +
            fileurl +
            '&filetype' +
            filetype,
        post
    )
}

const deletePost = (id) => {
    return axios.delete(API_BASE_URL + '/post/' + id)
}

const getAllPostByClassId = (id) => {
    return axios.get(API_BASE_URL + '/postbyclassid/' + id)
}

const PostService = {
    createPost,
    getAllPostByClassId,
    updatePost,
    deletePost,
}

export default PostService
