import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getProgressByUserIdAndCardId = (userId, cardId) => {
    return axios.get(
        API_BASE_URL +
            '/progressbyuserandcard?userid=' +
            userId +
            '&cardid=' +
            cardId,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

const customUpdateProgress = (userId, cardId, isStar, picture, audio, note) => {
    return axios.get(
        API_BASE_URL +
            '/customprogress?userid' +
            userId +
            '&cardid' +
            cardId +
            (isStar ? `&star${isStar}` : '') +
            '&picture' +
            picture +
            '&audio' +
            audio +
            '&note' +
            note,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

const ProgressService = {
    getProgressByUserIdAndCardId,
    customUpdateProgress,
}

export default ProgressService
