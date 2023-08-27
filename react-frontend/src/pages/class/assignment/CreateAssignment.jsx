import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'
import ClassService from '../../../services/ClassService'
import AssignmentService from '../../../services/AssignmentService'
import AttachmentService from '../../../services/AttachmentService'

import InstructionEditor from '../../../components/textEditor/InstructionEditor'

import { DeleteIcon, UploadIcon } from '../../../components/icons'
import { useTranslation } from 'react-i18next'

function CreateAssignment() {
    const navigate = useNavigate()

    const { id } = useParams()
    const { assign_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [classroom, setClassroom] = useState({})
    const [assignment, setAssignment] = useState({})
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [attachments, setAttachments] = useState([])
    const [loadingCreateAssign, setLoadingCreateAssign] = useState(false)
    const [saving, setSaving] = useState(null)

    const [error, setError] = useState('')
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    function getToday() {
        const today = new Date()
        return (
            today.getFullYear() +
            '-' +
            padWithLeadingZeros(today.getMonth() + 1, 2) +
            '-' +
            padWithLeadingZeros(today.getDate(), 2) +
            'T' +
            padWithLeadingZeros(today.getHours(), 2) +
            ':' +
            padWithLeadingZeros(today.getMinutes(), 2)
        )
    }

    function toFEDate(date) {
        return date?.replace(' ', 'T')
    }

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return new String(date?.replace(/\s/g, 'T') + '.000' + '+07:00')
        }
        return ''
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // class
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                // assignment
                var tempAssignment = {}
                if (assign_id) {
                    tempAssignment = (
                        await AssignmentService.getAssignmentById(assign_id)
                    ).data
                    // attachments
                    const tempAttachments = (
                        await AttachmentService.getAttachmentsByAssignmentId(
                            tempAssignment.id
                        )
                    ).data
                    setAttachments(tempAttachments)
                } else {
                    tempAssignment = (
                        await AssignmentService.createAssignment({
                            title: '',
                            classroom: {
                                id: tempClass.id,
                            },
                            user: {
                                id: userInfo.id,
                                username: userInfo.username,
                            },
                            due_date: '',
                            start_date: getToday(),
                            created_date: getToday(),
                            instruction: '',
                            _draft: true,
                        })
                    ).data
                }
                tempAssignment.created_date = toFEDate(
                    tempAssignment.created_date
                )
                tempAssignment.start_date = toFEDate(tempAssignment.start_date)
                tempAssignment.due_date = toFEDate(tempAssignment.due_date)
                if (tempAssignment?.user) {
                    tempAssignment.user.created_date = toBEDate(
                        tempAssignment.user.created_date
                    )
                    tempAssignment.user.dob = toBEDate(
                        tempAssignment.user.dob
                    )
                }
                if (tempAssignment?.classroom) {
                    tempAssignment.classroom.created_date = toBEDate(
                        tempAssignment.classroom.created_date
                    )
                    tempAssignment.classroom.deleted_date = toBEDate(
                        tempAssignment.classroom.deleted_date
                    )
                    if (tempAssignment.classroom?.user) {
                        tempAssignment.classroom.user.created_date = toBEDate(
                            tempAssignment.classroom.user.created_date
                        )
                        tempAssignment.classroom.user.dob = toBEDate(
                            tempAssignment.classroom.user.dob
                        )
                    }
                }
                setAssignment(tempAssignment)
                setTitle(tempAssignment?.title)
                setStartDate(tempAssignment?.start_date)
                setDueDate(tempAssignment?.due_date)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            try {
                const url = await uploadFile(
                    file,
                    `${userInfo.username}/class/${classroom.id}/assignment/${assignment.id}/tutor`
                )
                const tempAttachment = (
                    await AttachmentService.createAttachment({
                        file_name: file.name,
                        file_type: file.type,
                        file_url: url,
                        assignment: {
                            id: assignment.id,
                        },
                        attachmentType: {
                            id: 1,
                        },
                    })
                ).data
                setAttachments([...attachments, tempAttachment])
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        setLoadingUploadFile(false)
    }

    const handleDeleteFile = (file, index) => {
        try {
            var temp = [...attachments]
            temp.splice(index, 1)
            setAttachments(temp)
            AttachmentService.deleteAttachment(file.id)
            deleteFileByUrl(
                file.file_url,
                `${userInfo.username}/class/${classroom.id}/assignment/${assignment.id}/tutor`
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleUpdate = async (draft) => {
        setSaving(true)
        try {
            var tempAssignment = {
                ...assignment,
                _draft: draft,
            }
            tempAssignment.created_date = toBEDate(tempAssignment.created_date)
            tempAssignment.start_date = toBEDate(tempAssignment.start_date)
            tempAssignment.modified_date = toBEDate(
                tempAssignment.modified_date
            )
            tempAssignment.due_date = toBEDate(tempAssignment.due_date)
            await AssignmentService.updateAssignment(
                assignment.id,
                tempAssignment
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    const handleUpdateTitle = async (draft) => {
        setSaving(true)
        setError('')
        if (!title) {
            setError('Title cannot be empty')
            return
        }
        try {
            var tempAssignment = {
                ...assignment,
                title: title,
                _draft: draft,
            }
            tempAssignment.created_date = toBEDate(tempAssignment.created_date)
            tempAssignment.start_date = toBEDate(tempAssignment.start_date)
            tempAssignment.modified_date = toBEDate(
                tempAssignment.modified_date
            )
            tempAssignment.due_date = toBEDate(tempAssignment.due_date)
            await AssignmentService.updateAssignment(
                assignment.id,
                tempAssignment
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setAssignment({
            ...assignment,
            title: title,
            _draft: draft,
        })
        setSaving(false)
    }

    const handleUpdateStart = async (draft) => {
        setSaving(true)
        setError('')
        if (new Date(assignment.created_date) > new Date(startDate)) {
            setError(
                `Start date must be after ${assignment.created_date.replace(
                    'T',
                    ' '
                )}`
            )
            return
        }
        try {
            var tempAssignment = {
                ...assignment,
                start_date: startDate,
                _draft: draft,
            }
            tempAssignment.created_date = toBEDate(tempAssignment.created_date)
            tempAssignment.start_date = toBEDate(tempAssignment.start_date)
            tempAssignment.modified_date = toBEDate(
                tempAssignment.modified_date
            )
            tempAssignment.due_date = toBEDate(tempAssignment.due_date)
            await AssignmentService.updateAssignment(
                assignment.id,
                tempAssignment
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setAssignment({
            ...assignment,
            start_date: startDate,
            _draft: draft,
        })
        setSaving(false)
    }

    const handleUpdateDue = async (draft) => {
        setSaving(true)
        setError('')
        if (dueDate) {
            if (new Date(assignment.created_date) > new Date(dueDate)) {
                setError(
                    `Due date must be after ${assignment.created_date.replace(
                        'T',
                        ' '
                    )}`
                )
                return false
            }
            if (new Date(assignment.start_date) > new Date(dueDate)) {
                setError('Due date must be after start date')
                return false
            }
        }
        try {
            var tempAssignment = {
                ...assignment,
                due_date: dueDate,
                _draft: draft,
            }
            tempAssignment.created_date = toBEDate(tempAssignment.created_date)
            tempAssignment.start_date = toBEDate(tempAssignment.start_date)
            tempAssignment.modified_date = toBEDate(
                tempAssignment.modified_date
            )
            tempAssignment.due_date = toBEDate(tempAssignment.due_date)
            await AssignmentService.updateAssignment(
                assignment.id,
                tempAssignment
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setAssignment({
            ...assignment,
            due_date: dueDate,
            _draft: draft,
        })
        setSaving(false)
    }

    const handleSubmit = async (draft) => {
        setLoadingCreateAssign(true)
        navigate(`/class/${classroom.id}/assignment/${assignment.id}/details`)
        handleUpdate(draft)
        setAssignment({ ...assignment, _draft: draft })
        setLoadingCreateAssign(false)
    }

    return (
        <div className="mb-5">
            {/* button */}
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <button
                        className="createAssign_cancelBtn"
                        onClick={() => {
                            navigate(
                                `/class/${classroom.id}/assignment/${assignment.id}/details`
                            )
                        }}
                    >
                        {t('cancel')}
                    </button>
                    <div className="createTest_status">
                        {saving ? 'Saving...' : 'Saved'}
                    </div>
                </div>
                {assignment?._draft ? (
                    <div className="d-flex">
                        <button
                            className="createAssign_submitBtn"
                            disabled={!assignment?.title || loadingCreateAssign}
                            onClick={() => handleSubmit(false)}
                        >
                            {loadingCreateAssign ? 'Assigning...' : 'Assign'}
                        </button>
                        <button
                            className="createAssign_draftBtn"
                            disabled={!assignment?.title}
                            onClick={() => handleSubmit(true)}
                        >
                            {t('saveDraft')}
                        </button>
                    </div>
                ) : (
                    <button
                        className="createAssign_submitBtn"
                        disabled={!assignment?.title || loadingCreateAssign}
                        onClick={() => handleSubmit(false)}
                    >
                        {loadingCreateAssign ? 'Saving...' : 'Save'}
                    </button>
                )}
            </div>
            <div className="card mt-4">
                <div className="card-body p-4">
                    {error && (
                        <div className="alert alert-danger mb-4" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="createAssign_formGroup form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="title"
                            value={title || ''}
                            onChange={(event) => setTitle(event.target.value)}
                            onBlur={() => {
                                handleUpdateTitle(assignment?._draft)
                            }}
                        />
                        <label
                            htmlFor="title"
                            className="createAssign_formLabel"
                        >
                            {t('title')}
                        </label>
                    </div>
                    <div className="createAssign_formGroup form-floating mb-4">
                        <InstructionEditor
                            data={assignment?.instruction || ''}
                            onChange={(event, editor) => {
                                if (assignment?.id) {
                                    setAssignment({
                                        ...assignment,
                                        instruction: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => handleUpdate(assignment?._draft)}
                        />
                        <label className="createAssign_formLabel createAssign_editorLabel">
                            {t('instruction')}
                        </label>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="createAssign_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="start_date"
                                    id="start_date"
                                    placeholder="start date"
                                    min={assignment?.created_date || ''}
                                    value={startDate || ''}
                                    onChange={(event) =>
                                        setStartDate(event.target.value)
                                    }
                                    onBlur={() => {
                                        handleUpdateStart(assignment?._draft)
                                    }}
                                />
                                <label
                                    htmlFor="start_date"
                                    className="createAssign_formLabel"
                                >
                                    {t('startDate')}
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="createAssign_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="due_date"
                                    name="due_date"
                                    min={assignment?.start_date || ''}
                                    value={dueDate || ''}
                                    placeholder="due date"
                                    onChange={(event) => {
                                        setDueDate(event.target.value)
                                    }}
                                    onBlur={() => {
                                        handleUpdateDue(assignment?._draft)
                                    }}
                                />
                                <label
                                    htmlFor="due_date"
                                    className="createAssign_formLabel"
                                >
                                    {t('dueDate')}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {attachments.map((file, index) => (
                            <div className="col-6" key={index}>
                                <div className="card mb-2">
                                    <div className="card-body d-flex justify-content-between">
                                        <a
                                            className="text-decoration-none w-100 text-truncate"
                                            href={file.file_url}
                                            target="_blank"
                                        >
                                            <div className="fileUploadName">
                                                {file.file_name}
                                            </div>
                                            <div className="fileUploadType">
                                                {file.file_type}
                                            </div>
                                        </a>
                                        <button
                                            className="btn fileUploadDelButton"
                                            onClick={() =>
                                                handleDeleteFile(file, index)
                                            }
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        id="uploadPostFile"
                        className="postUpload"
                        onChange={handleUploadFile}
                    />
                    <button className="btn p-0" disabled={loadingUploadFile}>
                        <label
                            htmlFor="uploadPostFile"
                            className="postUploadButton p-2 rounded-circle d-flex align-items-center justify-content-center"
                        >
                            {loadingUploadFile ? (
                                <div
                                    className="spinner-border spinner-border-sm text-secondary"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        LoadingUpload...
                                    </span>
                                </div>
                            ) : (
                                <UploadIcon strokeWidth="2" />
                            )}
                        </label>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateAssignment
