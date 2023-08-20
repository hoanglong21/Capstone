import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createAssignment = (assignment) => {
    return axios.post(API_BASE_URL + '/assignments', assignment)
}

const getAssignmentById = (id) => {
    return axios.get(API_BASE_URL + '/assignments/' + id)
}

const updateAssignment = (id, assignment) => {
    return axios.put(API_BASE_URL + '/assignments/' + id, assignment)
}

const deleteAssignment = (id) => {
    return axios.delete(API_BASE_URL + '/assignments/' + id)
}

const getFilterList = (
    search,
    author,
    fromStart,
    toStart,
    fromCreated,
    toCreated,
    duedatefrom,
    duedateto,
    draft,
    direction,
    sortBy,
    classId,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterassignment?search' +
            search +
            '&author' +
            author +
            (fromStart ? `&fromstarted${fromStart}` : '') +
            (toStart ? `&tostarted${toStart}` : '') +
            (fromCreated ? `&fromcreated${fromCreated}` : '') +
            (toCreated ? `&tocreated${toCreated}` : '') +
            (duedatefrom ? `&duedatefrom${duedatefrom}` : '') +
            (duedateto ? `&duedateto${duedateto}` : '') +
            '&draft' +
            draft +
            '&direction' +
            direction +
            '&sortby' +
            sortBy +
            '&classid' +
            classId +
            '&page' +
            page +
            '&size' +
            size
    )
}

const getNumSubmitAssignment = (assignmentId, classId) => {
    return axios.get(
        API_BASE_URL +
            '/getsubmitassignment?assignmentid=' +
            assignmentId +
            '&classid=' +
            classId
    )
}

const AssignmentService = {
    createAssignment,
    getFilterList,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
    getNumSubmitAssignment,
}

export default AssignmentService
