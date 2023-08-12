import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const getCommentById = (id) => {
    return axios.get(API_BASE_URL + '/comments/' + id)
}

const getFilterList = (
    search,
    author,
    direction,
    typeid,
    postid,
    rootId,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filtercomment?search' +
            search +
            '&author' +
            author +
            '&direction' +
            direction +
            '&typeid' +
            typeid +
            '&postid' +
            postid +
            '&rootid' +
            rootId +
            '&page' +
            page +
            '&size' +
            size
    )
}

const getAllCommentByPostId = (id) => {
    return axios.get(API_BASE_URL + '/commentbypostid/' + id)
}

const getAllCommentByAssignmentId = (id) => {
    return axios.get(API_BASE_URL + '/commentbasignmentid/' + id)
}

const getAllCommentBySubmisionId = (id) => {
    return axios.get(API_BASE_URL + '/commentbysubmisionid/' + id)
}

const getAllCommentByTestId = (id) => {
    return axios.get(API_BASE_URL + '/commentbytestid/' + id)
}

const createComment = (comment) => {
    return axios.post(API_BASE_URL + '/comments', comment)
}

const updateComment = (id, comment) => {
    return axios.put(API_BASE_URL + '/comments/' + id, comment)
}

const deleteComment = (id) => {
    return axios.delete(API_BASE_URL + '/comments/' + id)
}

const CommentService = {
    getCommentById,
    getFilterList,
    getAllCommentByPostId,
    createComment,
    updateComment,
    deleteComment,
    getAllCommentByAssignmentId,
    getAllCommentBySubmisionId,
    getAllCommentByTestId,
}

export default CommentService
