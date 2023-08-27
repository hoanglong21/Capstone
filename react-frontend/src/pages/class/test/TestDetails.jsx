import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'

import CommentService from '../../../services/CommentService'
import TestService from '../../../services/TestService'

import Comment from '../../../components/comment/Comment'
import CardEditor from '../../../components/textEditor/CardEditor'

import {
    MemberSolidIcon,
    OptionHorIcon,
    SendIcon,
} from '../../../components/icons'
import defaultAvatar from '../../../assets/images/default_avatar.png'
import DeleteTest from './DeleteTest'
import { useTranslation } from 'react-i18next'

const TestDetails = () => {
    const navigate = useNavigate()

    const { test_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [test, setTest] = useState({})
    const [loading, setLoading] = useState(false)

    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showStartModal, setShowStartModal] = useState(false)

    const [numAttempt, setNumAttempt] = useState(0)
    const [canTest, setCanTest] = useState(true)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // test
                const tempTest = (await TestService.getTestById(test_id)).data
                setTest(tempTest)
                // comments
                const tempComments = (
                    await CommentService.getAllCommentByTestId(test_id)
                ).data
                setComments(tempComments)
                // can test
                if (userInfo.id !== tempTest?.classroom?.user?.id) {
                    const tempNumAttempt = (
                        await TestService.getNumAttempt(test_id, userInfo.id)
                    ).data.num_attempt
                    setNumAttempt(tempNumAttempt)
                    if (tempNumAttempt >= tempTest?.num_attemps) {
                        setCanTest(false)
                    }
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
                    isNaN(test_id)
                ) {
                    navigate('/notFound')
                }
            }
        }
        if (test_id && userInfo?.id) {
            setLoading(true)
            fetchData()
            setLoading(false)
        }
    }, [test_id, userInfo])

    const handleCopyLink = (event) => {
        navigator.clipboard.writeText(window.location.href)
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
            var tempComment = {
                user: {
                    id: userInfo.id,
                    username: userInfo.username,
                    avatar: userInfo.avatar,
                    status: userInfo.status,
                },
                content: text,
                commentType: {
                    id: 3,
                },
                test: {
                    id: test.id,
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

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border"
                    style={{ width: '3rem', height: '3rem' }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="instruction_container">
                <div className="instruction_main">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div>
                            <div className="instruction_heading">
                                {test?.title}
                                {test?._draft ? ' (Draft)' : ''}
                            </div>
                            <div className="d-flex mt-1 instruction_info">
                                <div>{test?.user?.username}</div>
                                <div className="mx-1">·</div>
                                <div>
                                    {test?.created_date}{' '}
                                    {test?.modified_date
                                        ? `(Edited ${test?.modified_date})`
                                        : ''}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => {
                                    setShowStartModal(true)
                                }}
                                disabled={test?._draft || !canTest}
                            >
                                {t('doTest')}
                            </button>
                            {!test?.classroom?._deleted && (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-outline-secondary icon-outline-secondary "
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <OptionHorIcon />
                                    </button>
                                    <ul className="dropdown-menu">
                                        {userInfo?.id ===
                                            test?.classroom?.user?.id && (
                                            <div>
                                                <li>
                                                    <Link
                                                        className="dropdown-item py-1 px-3 d-flex align-items-center"
                                                        type="button"
                                                        to={`../../../edit-test/${test_id}`}
                                                        relative="path"
                                                    >
                                                        {t('edit')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item py-1 px-3 d-flex align-items-center"
                                                        type="button"
                                                        onClick={() => {
                                                            setShowDeleteModal(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        {t('delete')}
                                                    </button>
                                                </li>
                                            </div>
                                        )}
                                        <li>
                                            <button
                                                className="dropdown-item py-1 px-3 d-flex align-items-center"
                                                type="button"
                                                onClick={handleCopyLink}
                                            >
                                                {t('copyLink')}
                                            </button>
                                        </li>
                                        {userInfo?.id !==
                                            test?.classroom?.user?.id && (
                                            <div>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item py-1 px-3 d-flex align-items-center"
                                                        type="button"
                                                    >
                                                        {t('report')}
                                                    </button>
                                                </li>
                                            </div>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="my-2">{test?.description}</div>
                    <div className="d-flex justify-content-between mb-2 instruction_date">
                        <div>
                            {t('numAttempts')}: {test?.num_attemps}
                        </div>
                        {userInfo?.id !== test?.classroom?.user?.id ? (
                            <div>
                                {t('nAtt')}: {numAttempt || 0}
                            </div>
                        ) : (
                            <div>
                                {t('dura')}: {test?.duration || 'No duration'}
                            </div>
                        )}
                    </div>
                    {userInfo?.id !== test?.classroom?.user?.id && (
                        <div className="mb-2 instruction_date">
                            {t('dura')}: {test?.duration || 'No duration'}
                        </div>
                    )}
                    <div className="d-flex justify-content-between mb-3 instruction_date">
                        <div>
                            {test?.start_date
                                ? `Start ${test?.start_date}`
                                : 'No start date'}
                        </div>
                        <div>
                            {test?.due_date
                                ? `Due ${test?.due_date}`
                                : 'No due date'}
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center comment_label mt-4 mb-3">
                    <MemberSolidIcon size="24px" className="me-2" />
                    <span>
                        {comments.length === 0
                            ? 'Class comments'
                            : `${comments.length} class comment`}
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
                {!test?.classroom?._deleted && (
                    <div className="d-flex">
                        <img
                            src={userInfo?.avatar || defaultAvatar}
                            className="comment_img me-3"
                        />
                        <div className="commentEditor flex-fill">
                            <CardEditor
                                data={addComment}
                                onChange={(event, editor) => {
                                    setAddComment(editor.getData())
                                }}
                            />
                        </div>
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
                                        {t('loadingUpload')}...
                                    </span>
                                </div>
                            ) : (
                                <SendIcon size="20px" strokeWidth="1.8" />
                            )}
                        </button>
                    </div>
                )}

                {/* delete modal */}
                <DeleteTest
                    test={test}
                    classroom={test?.classroom}
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
                {/* start test modal */}
                <Modal
                    className="startTestModal"
                    show={showStartModal}
                    onHide={() => {
                        setShowStartModal(false)
                    }}
                >
                    <Modal.Body className="p-4">{t('msg85')}?</Modal.Body>
                    <Modal.Footer>
                        <button
                            id="startTestModalClose"
                            type="button"
                            className="btn btn-secondary btn-sm me-3"
                            onClick={() => {
                                setShowStartModal(false)
                            }}
                        >
                            {t('cancel')}
                        </button>
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                                setShowStartModal(false)
                                navigate(`/do-test/${test?.id}`)
                            }}
                        >
                            {t('start')}
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default TestDetails
