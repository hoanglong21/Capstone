import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createPost = (post) => {
    return axios.post(API_BASE_URL + '/post', post, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const updatePost = (id, post) => {
    return axios.put(API_BASE_URL + '/post/' + id, post, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const deletePost = (id) => {
    return axios.delete(API_BASE_URL + '/post/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getAllPostByClassId = (id) => {
    return axios.get(API_BASE_URL + '/postbyclassid/' + id)
}

const getPostById = (id) => {
    return axios.get(API_BASE_URL + '/post/' + id)
}

const getFilterList = (
    search,
    author,
    fromcreated,
    tocreated,
    sortby,
    direction,
    classId,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterpost?search' +
            search +
            '&author' +
            author +
            '&fromcreated' +
            fromcreated +
            '&tocreated' +
            tocreated +
            '&sortby' +
            sortby +
            '&direction' +
            direction +
            '&classid' +
            classId +
            '&page' +
            page +
            '&size' +
            size
    )
}

const PostService = {
    createPost,
    getAllPostByClassId,
    updatePost,
    deletePost,
    getFilterList,
    getPostById,
}

export default PostService
