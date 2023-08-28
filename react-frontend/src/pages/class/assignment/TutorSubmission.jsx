import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import ClassLearnerService from '../../../services/ClassLearnerService'
import AssignmentService from '../../../services/AssignmentService'
import SubmissionService from '../../../services/SubmissionService'
import AttachmentService from '../../../services/AttachmentService'
import CommentService from '../../../services/CommentService'

import Comment from '../../../components/comment/Comment'
import CardEditor from '../../../components/textEditor/CardEditor'

import defaultAvatar from '../../../assets/images/default_avatar.png'
import banned from '../../../assets/images/banned.png'
import verified from '../../../assets/images/verified.png'
import deleted from '../../../assets/images/deleted.png'
import {
    CloseIcon,
    ProfileSolidIcon,
    SearchIcon,
    SendIcon,
} from '../../../components/icons'
import './assignment.css'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const TutorSubmission = ({ assignment }) => {
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const { assign_id } = useParams()

    const [learners, setLearners] = useState([])
    const [numSubmit, setNumSubmit] = useState(0)
    const [numNotSubmit, setNumNotSubmit] = useState(0)
    const [classLearner, setClassLearner] = useState({})
    const [submission, setSubmission] = useState({})
    const [attachments, setAttachments] = useState([])
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(false)
    const [loadingSelect, setLoadingSelect] = useState(false)

    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)

    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            setError('')
            var tempLearners = {}
            var tempSubmission = {}
            try {
                // learners
                tempLearners = (
                    await ClassLearnerService.filterGetLeaner(
                        '',
                        `=${assignment?.classroom?.id}`,
                        '',
                        '=enrolled',
                        '',
                        '',
                        '',
                        ''
                    )
                ).data
                setLearners(tempLearners.list)
                // count
                const tempCountSubmit = (
                    await AssignmentService.getNumSubmitAssignment(
                        assignment.id,
                        assignment.classroom.id
                    )
                ).data
                setNumSubmit(tempCountSubmit.submitted)
                setNumNotSubmit(tempCountSubmit.notsubmitted)
                // submission
                if (tempLearners.totalItems > 0) {
                    tempSubmission = (
                        await SubmissionService.getSubmissionByAuthorIdandAssignmentId(
                            tempLearners.list[0].userid,
                            assignment.id
                        )
                    ).data
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist') ||
                    isNaN(assign_id)
                ) {
                    navigate('/notFound')
                }
            }
            try {
                if (tempSubmission?.id) {
                    // attachments
                    const tempAttachments = (
                        await AttachmentService.getAttachmentsBySubmissionId(
                            tempSubmission.id
                        )
                    ).data
                    setAttachments(tempAttachments)
                    // comments
                    const tempComments = (
                        await CommentService.getAllCommentBySubmisionId(
                            tempSubmission.id
                        )
                    ).data
                    setComments(tempComments)
                } else {
                    tempSubmission = {
                        user: {
                            id: tempLearners.list[0].userid,
                            username: tempLearners.list[0].username,
                            avatar: tempLearners.list[0].avatar,
                            status: tempLearners.list[0].userstatus,
                        },
                        assignment: {
                            id: assignment.id,
                        },
                    }
                }
                setClassLearner(tempLearners.list[0])
                setSubmission(tempSubmission)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (assignment?.id) {
            fetchData()
        }
    }, [assignment])

    // search
    useEffect(() => {
        const fetchData = async () => {
            setError('')
            var tempLearners = {}
            var tempSubmission = {}
            try {
                // learners
                tempLearners = (
                    await ClassLearnerService.filterGetLeaner(
                        '',
                        `=${assignment?.classroom?.id}`,
                        `${search ? `=${search}` : ''}`,
                        '=enrolled',
                        '',
                        '',
                        '',
                        ''
                    )
                ).data
                setLearners(tempLearners.list)
                // submission
                if (tempLearners.length > 0) {
                    tempSubmission = (
                        await SubmissionService.getSubmissionByAuthorIdandAssignmentId(
                            tempLearners.list[0].userid,
                            assignment.id
                        )
                    ).data
                }
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
            try {
                if (tempSubmission?.id) {
                    // attachments
                    const tempAttachments = (
                        await AttachmentService.getAttachmentsBySubmissionId(
                            tempSubmission.id
                        )
                    ).data
                    setAttachments(tempAttachments)
                    // comments
                    const tempComments = (
                        await CommentService.getAllCommentBySubmisionId(
                            tempSubmission.id
                        )
                    ).data
                    setComments(tempComments)
                } else {
                    tempSubmission = {
                        user: {
                            id: tempLearners.list[0].userid,
                            username: tempLearners.list[0].username,
                            avatar: tempLearners.list[0].avatar,
                            status: tempLearners.list[0].userstatus,
                        },
                        assignment: {
                            id: assignment.id,
                        },
                    }
                    setComments([])
                }
                setClassLearner(tempLearners.list[0])
                setSubmission(tempSubmission)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (assignment?.id) {
            fetchData()
        }
    }, [search])

    const handleUpdateGrade = async () => {
        setSaving(true)
        setError(false)
        // validation
        if (submission?.mark < 0 || submission?.mark > 100) {
            setError(true)
            setSaving(false)
            return
        }
        // update
        try {
            var tempSubmission = {
                ...submission,
                mark: submission.mark,
            }
            tempSubmission.created_date = toBEDate(tempSubmission.created_date)
            tempSubmission.modified_date = toBEDate(
                tempSubmission.modified_date
            )
            if (tempSubmission?.user) {
                tempSubmission.user.created_date = toBEDate(
                    tempSubmission.user.created_date
                )
                tempSubmission.user.dob = toBEDate(tempSubmission.user.dob)
                tempSubmission.user.banned_date = toBEDate(
                    tempSubmission.user.banned_date
                )
                tempSubmission.user.deleted_date = toBEDate(
                    tempSubmission.user.deleted_date
                )
            }
            if (tempSubmission?.assignment) {
                tempSubmission.assignment.created_date = toBEDate(
                    tempSubmission.assignment.created_date
                )
                tempSubmission.assignment.modified_date = toBEDate(
                    tempSubmission.assignment.modified_date
                )
                tempSubmission.assignment.start_date = toBEDate(
                    tempSubmission.assignment.start_date
                )
                tempSubmission.assignment.due_date = toBEDate(
                    tempSubmission.assignment.due_date
                )
                if (tempSubmission.assignment?.user) {
                    tempSubmission.assignment.user.created_date = toBEDate(
                        tempSubmission.assignment.user.created_date
                    )
                    tempSubmission.assignment.user.dob = toBEDate(
                        tempSubmission.assignment.user.dob
                    )
                    tempSubmission.assignment.user.banned_date = toBEDate(
                        tempSubmission.assignment.user.banned_date
                    )
                    tempSubmission.assignment.user.deleted_date = toBEDate(
                        tempSubmission.assignment.user.deleted_date
                    )
                }
                if (tempSubmission.assignment?.classroom) {
                    tempSubmission.assignment.classroom.created_date = toBEDate(
                        tempSubmission.assignment.classroom.created_date
                    )
                    tempSubmission.assignment.classroom.deleted_date = toBEDate(
                        tempSubmission.assignment.classroom.deleted_date
                    )
                    if (tempSubmission.assignment.classroom?.user) {
                        tempSubmission.assignment.classroom.user.created_date =
                            toBEDate(
                                tempSubmission.assignment.classroom.user
                                    .created_date
                            )
                        tempSubmission.assignment.classroom.user.dob = toBEDate(
                            tempSubmission.assignment.classroom.user.dob
                        )
                        tempSubmission.assignment.classroom.user.banned_date =
                            toBEDate(
                                tempSubmission.assignment.classroom.user
                                    .banned_date
                            )
                        tempSubmission.assignment.classroom.user.deleted_date =
                            toBEDate(
                                tempSubmission.assignment.classroom.user
                                    .deleted_date
                            )
                    }
                }
            }
            setSubmission(
                (
                    await SubmissionService.updateSubmission(
                        submission.id,
                        tempSubmission
                    )
                ).data
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

    const handleSelectLearner = async (learner) => {
        setLoadingSelect(true)
        var tempSubmission = {}
        try {
            tempSubmission = (
                await SubmissionService.getSubmissionByAuthorIdandAssignmentId(
                    learner.userid,
                    assignment.id
                )
            ).data
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingSelect(false)
        try {
            if (!tempSubmission?.id) {
                tempSubmission = {
                    user: {
                        id: learner.userid,
                        username: learner.username,
                        avatar: learner.avatar,
                        status: learner.userstatus,
                    },
                    assignment: {
                        id: assignment.id,
                    },
                }
                setComments([])
            } else {
                // attachments
                const tempAttachments = (
                    await AttachmentService.getAttachmentsBySubmissionId(
                        tempSubmission.id
                    )
                ).data
                setAttachments(tempAttachments)
                // comments
                const tempComments = (
                    await CommentService.getAllCommentBySubmisionId(
                        tempSubmission.id
                    )
                ).data
                setComments(tempComments)
            }
            setSubmission(tempSubmission)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleAddComment = async () => {
        setLoadingComment(true)
        try {
            var text = new String(addComment)
            while (true) {
                const lastIndex = text.lastIndexOf('<p>&nbsp;</p>')
                if (text.length - 13 !== lastIndex) {
                    break
                }
                text = new String(text.slice(0, lastIndex))
            }
            // create comment
            var tempSubmission = {}
            if (!submission?.id) {
                tempSubmission = (
                    await SubmissionService.createSubmission({
                        user: {
                            id: classLearner.userid,
                            username: classLearner.username,
                            avatar: classLearner.avatar,
                            status: classLearner.userstatus,
                        },
                        assignment: {
                            id: assignment.id,
                        },
                    })
                ).data
            }
            var tempComment = {
                user: {
                    id: userInfo.id,
                    username: userInfo.username,
                    avatar: userInfo.avatar,
                },
                content: text,
                commentType: {
                    id: 5,
                },
                submission: {
                    id: submission?.id || tempSubmission.id,
                },
            }
            tempComment = (await CommentService.createComment(tempComment)).data
            // add to list
            setComments([...comments, tempComment])
            // clear
            setAddComment('')
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingComment(false)
    }

    return (
        <div className="submission_container">
            {/* header */}
            <div className="submission_heading border-bottom">
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="submission_title mb-2">
                            {assignment?.title}
                        </div>
                        <form className="input-group mb-0">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchInput || ''}
                                onChange={(event) => {
                                    setSearchInput(event.target.value)
                                }}
                            />
                            {searchInput && (
                                <button
                                    className="btn btn-outline-secondary px-2"
                                    type="button"
                                    onClick={() => {
                                        setSearch('')
                                        setSearchInput('')
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            )}
                            <button
                                className="btn btn-outline-secondary px-2"
                                type="submit"
                                onClick={(event) => {
                                    event.preventDefault()
                                    setSearch(searchInput)
                                }}
                            >
                                <SearchIcon />
                            </button>
                        </form>
                    </div>
                    <div className="d-flex">
                        <div className="asignInfo_block">
                            <div className="assignInfo_number">{numSubmit}</div>
                            <div className="assignInfo_title">
                                {t('turnIn')}
                            </div>
                        </div>
                        <div className="asignInfo_block">
                            <div className="assignInfo_number">
                                {numNotSubmit}
                            </div>
                            <div className="assignInfo_title">
                                {t('assigned')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* list */}
                <div className="submission-col-4 pe-0 border-end">
                    <table className="table table-hover submission_table mb-0">
                        <tbody>
                            {learners?.map((learner, index) => (
                                <tr key={index}>
                                    <td
                                        className={`d-flex align-items-center submission_item ${
                                            learner?.userid ===
                                                submission?.user?.id && 'active'
                                        }`}
                                        onClick={() =>
                                            handleSelectLearner(learner)
                                        }
                                    >
                                        <img
                                            className="submission_learnerAvatar"
                                            src={
                                                learner?.avatar || defaultAvatar
                                            }
                                        />
                                        <span className="submission_learnerUsername ms-4">
                                            {learner?.username}
                                        </span>
                                        {learner?.userstatus === 'banned' && (
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip">
                                                        {t('msg9')}.
                                                    </Tooltip>
                                                }
                                            >
                                                <img
                                                    className="ms-1 author-avatarTag author-avatarTag--banned"
                                                    src={banned}
                                                />
                                            </OverlayTrigger>
                                        )}
                                        {learner?.userstatus === 'active' && (
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip">
                                                        {t('msg8')}.
                                                    </Tooltip>
                                                }
                                            >
                                                <img
                                                    className="ms-1 author-avatarTag"
                                                    src={verified}
                                                />
                                            </OverlayTrigger>
                                        )}
                                        {learner?.userstatus === 'deleted' && (
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip">
                                                        {t('msg7')}.
                                                    </Tooltip>
                                                }
                                            >
                                                <img
                                                    className="ms-1 author-avatarTag"
                                                    src={deleted}
                                                />
                                            </OverlayTrigger>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* detail */}
                <div className="submission-col-8 ps-0">
                    {loadingSelect ? (
                        <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    ) : submission?.id ? (
                        <div>
                            <div className="submission_detail">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <div className="submission_title mb-1">
                                            {submission?.user?.username}
                                        </div>
                                        <div className="submission_status">
                                            {submission?._done
                                                ? 'Turned in'
                                                : 'Assigned'}
                                        </div>
                                    </div>
                                    <div className="submission_grade d-flex flex-column align-items-end">
                                        <div
                                            id="submission_inputGradeWrapper"
                                            className="submission_inputGradeWrapper"
                                        >
                                            <input
                                                type="number"
                                                className="submission_inputGrade"
                                                value={submission?.mark || ''}
                                                disabled={
                                                    assignment?.classroom
                                                        ?._deleted
                                                }
                                                onChange={(event) => {
                                                    setSubmission({
                                                        ...submission,
                                                        mark: event.target
                                                            .value,
                                                    })
                                                }}
                                                onFocus={() => {
                                                    document.getElementById(
                                                        'submission_inputGradeWrapper'
                                                    ).style.borderBottom =
                                                        '2px solid rgb(66,133,244)'
                                                }}
                                                onBlur={() => {
                                                    document.getElementById(
                                                        'submission_inputGradeWrapper'
                                                    ).style.borderBottom =
                                                        '1px solid rgba(0, 0, 0, 0.12)'
                                                    handleUpdateGrade()
                                                }}
                                            />
                                            /100
                                        </div>
                                        {saving && (
                                            <div className="submission_status text-end">
                                                {t('saving')}...
                                            </div>
                                        )}
                                        {error && (
                                            <div className="submission_status submission_status--error text-end">
                                                {t('msg80')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    {/* attchment */}
                                    {attachments.map((file, index) => (
                                        <div className="col-6" key={index}>
                                            <a
                                                className="card mb-2 text-decoration-none"
                                                href={file.file_url}
                                                target="_blank"
                                            >
                                                <div className="card-body d-flex justify-content-between">
                                                    <div className="fileUploadContainer">
                                                        <div className="fileUploadName">
                                                            {file.file_name}
                                                        </div>
                                                        <div className="fileUploadType">
                                                            {file.file_type}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border-top">
                                <div className="submission_comments">
                                    <div className="d-flex align-items-center comment_label mb-3">
                                        <ProfileSolidIcon
                                            size="24px"
                                            className="me-2"
                                        />
                                        <span>
                                            {comments.length === 0
                                                ? 'Private comments'
                                                : `${comments.length} private comment`}
                                        </span>
                                    </div>
                                    {comments?.map((comment, index) => (
                                        <Comment
                                            key={comment.id}
                                            index={index}
                                            comments={comments}
                                            setComments={setComments}
                                            comment={comment}
                                            userInfo={userInfo}
                                        />
                                    ))}
                                    {/* add comment */}
                                    {!assignment?.classroom?._deleted && (
                                        <div className="d-flex">
                                            <img
                                                src={
                                                    userInfo?.avatar ||
                                                    defaultAvatar
                                                }
                                                className="comment_img me-3"
                                                alt=""
                                            />
                                            <div className="commentEditor flex-fill">
                                                <CardEditor
                                                    data={addComment}
                                                    onChange={(
                                                        event,
                                                        editor
                                                    ) => {
                                                        setAddComment(
                                                            editor.getData()
                                                        )
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    className="comment_btn ms-1"
                                                    onClick={handleAddComment}
                                                    disabled={!addComment}
                                                >
                                                    {loadingComment ? (
                                                        <div
                                                            className="spinner-border spinner-border-sm text-secondary"
                                                            role="status"
                                                        >
                                                            <span className="visually-hidden">
                                                                {t(
                                                                    'loadingUpload'
                                                                )}
                                                                ...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <SendIcon
                                                            size="20px"
                                                            strokeWidth="1.8"
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>
    )
}
export default TutorSubmission
