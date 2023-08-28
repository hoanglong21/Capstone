import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

import StudySetService from '../../../services/StudySetService'
import CardService from '../../../services/CardService'
import CommentService from '../../../services/CommentService'

import Report from '../../../components/report/Report'
import ViewCard from './ViewCard'
import DeleteSet from '../DeleteSet'
import Pagination from '../../../components/Pagination'
import AssignToClass from '../AssignToClass'
import Comment from '../../../components/comment/Comment'
import CardEditor from '../../../components/textEditor/CardEditor'

import defaultAvatar from '../../../assets/images/default_avatar.png'
import {
    DeleteIcon,
    EditIcon,
    LearnSolidIcon,
    OptionHorIcon,
    AddCircleIcon,
    StudySetSolidIcon,
    TestSolidIcon,
    ArrowDownIcon,
    StarSolidIcon,
    CommentSolidIcon,
    SendIcon,
    CloseIcon,
    ReportIcon,
} from '../../../components/icons'
import banned from '../../../assets/images/banned.png'
import verified from '../../../assets/images/verified.png'
import deleted from '../../../assets/images/deleted.png'
import './viewStudySet.css'
import { useTranslation } from 'react-i18next'

const ViewStudySet = () => {
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [studySet, setStudySet] = useState({})
    const [cards, setCards] = useState([])
    const [numCards, setNumCards] = useState(0)
    const [numStars, setNumStars] = useState(0)

    const [numNot, setNumNot] = useState(0)
    const [numStill, setNumStill] = useState(0)
    const [numMaster, setNumMaster] = useState(0)
    const [numNotStar, setNumNotStar] = useState(0)
    const [numStillStar, setNumStillStar] = useState(0)
    const [numMasterStar, setNumMasterStar] = useState(0)

    const [numNotProgressLeft, setNumNotProgressLeft] = useState(0)
    const [numNotProgressRight, setNumNotProgressRight] = useState(0)
    const [numStillProgressLeft, setNumStillProgressLeft] = useState(0)
    const [numStillProgressRight, setNumStillProgressRight] = useState(0)
    const [numMasterProgressLeft, setNumMasterProgressLeft] = useState(0)
    const [numMasterProgressRight, setNumMasterProgressRight] = useState(0)

    const [filterStar, setFilterStar] = useState(0)
    const [filterProgress, setFilterProgress] = useState('All progress')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [page, setPage] = useState(1)

    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showCommentModal, setShowCommentModal] = useState(false)
    const [showAssignModal, setShowAssignModal] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    const [showWarningModal, setShowWarningModal] = useState(false)
    const { userLanguage } = useSelector((state) => state.user)
    const { t, i18n } = useTranslation()

    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        if (id.includes('.')) {
            navigate('/notFound')
            return
        }
    }, [])

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    // ignore error
    useEffect(() => {
        window.addEventListener('error', (e) => {
            console.log(e)
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            )
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            )
            if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none')
            }
            if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none')
            }
        })
    }, [])

    useEffect(() => {
        const search = async () => {
            setLoadingFilter(true)
            try {
                const tempCards = (
                    await CardService.getFilterCard(
                        `=${userInfo?.id || studySet?.user?.id}`,
                        `=${studySet.id}`,
                        `=${
                            filterProgress === 'All progress'
                                ? 'not studied,still learning,mastered'
                                : filterProgress
                        }`,
                        `=${filterStar}`,
                        '',
                        '',
                        `=${page}`,
                        '=10'
                    )
                ).data.list
                setCards(tempCards)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist') ||
                    isNaN(id)
                ) {
                    navigate('/notFound')
                }
            }
            setLoadingFilter(false)
        }
        if (studySet?.id) {
            search()
        }
    }, [studySet, userInfo, filterStar, filterProgress, page])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // study set
                const tempStudySet = (await StudySetService.getStudySetById(id))
                    .data
                setStudySet(tempStudySet)
                // cards
                const tempCards = (
                    await CardService.getFilterCard(
                        `=${userInfo?.id || tempStudySet?.user?.id}`,
                        `=${tempStudySet.id}`,
                        '=not studied,still learning,mastered',
                        '=0',
                        '',
                        '',
                        '=1',
                        '=10'
                    )
                ).data
                setCards(tempCards.list)
                const tempNumCards = tempCards.totalItems
                setNumCards(tempNumCards)
                // comments
                const tempComments = (
                    await CommentService.getAllCommentByStudysetId(
                        tempStudySet.id
                    )
                ).data
                setComments(tempComments)
                if (userInfo?.id) {
                    // number
                    const tempCounts = (
                        await StudySetService.countCardInSet(userInfo.id, id)
                    ).data
                    setNumNot(tempCounts['Not studied'])
                    setNumStill(tempCounts['Still learning'])
                    setNumMaster(tempCounts['Mastered'])
                    setNumNotStar(tempCounts['Not studied star'])
                    setNumStillStar(tempCounts['Still learning star'])
                    setNumMasterStar(tempCounts['Mastered star'])
                    const tempNumStars =
                        tempCounts['Not studied star'] +
                        tempCounts['Still learning star'] +
                        tempCounts['Mastered star']
                    setNumStars(tempNumStars)
                    // num progress
                    const tempNumNotProgress =
                        (tempCounts['Not studied'] / tempNumCards) * 360
                    setNumNotProgressLeft(
                        tempNumNotProgress > 180 ? 180 : tempNumNotProgress
                    )
                    setNumNotProgressRight(
                        tempNumNotProgress > 180 ? tempNumNotProgress - 180 : 0
                    )
                    const tempNumStillProgress =
                        (tempCounts['Still learning'] / tempNumCards) * 360
                    setNumStillProgressLeft(
                        tempNumStillProgress > 180 ? 180 : tempNumStillProgress
                    )
                    setNumStillProgressRight(
                        tempNumStillProgress > 180
                            ? tempNumStillProgress - 180
                            : 0
                    )
                    const tempNumMasteredProgress =
                        (tempCounts['Mastered'] / tempNumCards) * 360
                    setNumMasterProgressLeft(
                        tempNumMasteredProgress > 180
                            ? 180
                            : tempNumMasteredProgress
                    )
                    setNumMasterProgressRight(
                        tempNumMasteredProgress > 180
                            ? tempNumMasteredProgress - 180
                            : 0
                    )
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
                    isNaN(id)
                ) {
                    navigate('/notFound')
                }
            }
        }
        if (userInfo?.role === 'ROLE_ADMIN') {
            navigate('/dashboard')
        } else if (id) {
            fetchData()
        }
    }, [id, userInfo])

    useEffect(() => {
        if (showCommentModal || showAssignModal || showDeleteModal) {
            document
                .getElementsByTagName('body')[0]
                .classList.add('setPage_modalOpen')
        } else {
            document
                .getElementsByTagName('body')[0]
                .classList.remove('setPage_modalOpen')
        }
    }, [showCommentModal, showAssignModal, showDeleteModal])

    const handleAddComment = async () => {
        setLoadingComment(true)
        try {
            // remove line break
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
                    id: 2,
                },
                studySet: {
                    id: studySet.id,
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

    const tooltip = (
        <Tooltip id="tooltip">
            This account is{' '}
            {studySet?.user?.status === 'active'
                ? 'verified'
                : studySet?.user?.status}
            .
        </Tooltip>
    )

    return (
        <div className="container setPageContainer">
            <div className="setTitle">
                <h2>
                    {studySet?.title}
                    {studySet?._draft && ' (Draft)'}
                    {studySet?._deleted && ' (Deleted)'}
                </h2>
            </div>
            {/* Modes */}
            <div className="row mb-4">
                <div className="studyset-col-4">
                    <button
                        className="studyModesItem d-flex align-items-center justify-content-center w-100"
                        onClick={() => {
                            if (userInfo?.id) {
                                navigate(`/flashcards/${studySet.id}`)
                            } else {
                                setShowWarningModal(true)
                            }
                        }}
                    >
                        <StudySetSolidIcon
                            className="StudyModesIcon"
                            size="2rem"
                        />
                        <span className="studyModesItemName">
                            {t('flashcard')}
                        </span>
                    </button>
                </div>
                <div className="studyset-col-4">
                    <button
                        className="studyModesItem d-flex align-items-center justify-content-center w-100"
                        onClick={() => {
                            if (userInfo?.id) {
                                navigate(`/learn/${studySet.id}`)
                            } else {
                                setShowWarningModal(true)
                            }
                        }}
                    >
                        <LearnSolidIcon
                            className="StudyModesIcon"
                            size="2rem"
                        />
                        <span className="studyModesItemName" href="/learn">
                            {t('learn')}
                        </span>
                    </button>
                </div>
                <div className="studyset-col-4">
                    <button
                        className="studyModesItem d-flex align-items-center justify-content-center w-100"
                        onClick={() => {
                            if (userInfo?.id) {
                                navigate(`/quiz/${studySet.id}`)
                            } else {
                                setShowWarningModal(true)
                            }
                        }}
                    >
                        <TestSolidIcon className="StudyModesIcon" size="2rem" />
                        <span className="studyModesItemName">{t('quiz')}</span>
                    </button>
                </div>
            </div>
            {/* Author + comments + Options */}
            <div className="setPageInformation d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img
                        alt="avatarAuthor"
                        className="setAuthorAvatar"
                        src={
                            studySet?.user?.avatar
                                ? studySet.user.avatar
                                : defaultAvatar
                        }
                    />
                    <div className="setAuthorInfo ms-2">
                        <span className="setAuthorInfo_createdBy">
                            Created by
                        </span>
                        <div className="d-flex align-items-center">
                            <Link
                                to={`/${studySet?.user?.username}/sets`}
                                className="setAuthorInfo_username"
                            >
                                {studySet?.user?.username}
                            </Link>
                            {studySet?.user?.status === 'banned' && (
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={tooltip}
                                >
                                    <img
                                        className="ms-1 setAuthorAvatarTag setAuthorAvatarTag--banned"
                                        src={banned}
                                    />
                                </OverlayTrigger>
                            )}
                            {studySet?.user?.status === 'active' && (
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={tooltip}
                                >
                                    <img
                                        className="ms-1 setAuthorAvatarTag"
                                        src={verified}
                                    />
                                </OverlayTrigger>
                            )}
                            {studySet?.user?.status === 'deleted' && (
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={tooltip}
                                >
                                    <img
                                        className="ms-1 setAuthorAvatarTag"
                                        src={deleted}
                                    />
                                </OverlayTrigger>
                            )}
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <button
                        className="btn d-flex align-items-center comment_label-me-4"
                        onClick={() => {
                            setShowCommentModal(true)
                        }}
                    >
                        <CommentSolidIcon size="24px" className="me-2" />
                        <span>
                            {comments?.length === 0
                                ? 'Comments'
                                : `${comments?.length} comment`}
                        </span>
                    </button>
                    {userInfo?.id === studySet?.user?.id &&
                    !studySet?._deleted ? (
                        <div className="dropdown setPageOptions d-flex align-items-center justify-content-center">
                            <button
                                className="btn"
                                type="button dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <OptionHorIcon />
                            </button>
                            <ul className="dropdown-menu">
                                {userInfo?.role === 'ROLE_TUTOR' && (
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3 d-flex align-items-center"
                                            type="button"
                                            onClick={() => {
                                                if (!userToken) {
                                                    navigate('/login')
                                                } else {
                                                    setShowAssignModal(true)
                                                }
                                            }}
                                        >
                                            <AddCircleIcon
                                                className="me-3"
                                                size="1.3rem"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                {t('addClass')}
                                            </span>
                                        </button>
                                    </li>
                                )}
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-3 d-flex align-items-center"
                                        type="button"
                                        onClick={() => {
                                            if (!userToken) {
                                                navigate('/login')
                                            } else {
                                                navigate(`/edit-set/${id}`)
                                            }
                                        }}
                                    >
                                        <EditIcon
                                            className="me-3"
                                            size="1.3rem"
                                        />
                                        <span className="align-middle fw-semibold">
                                            {t('edit')}
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                                        type="button"
                                        onClick={() => {
                                            if (!userToken) {
                                                navigate('/login')
                                            } else {
                                                setShowDeleteModal(true)
                                            }
                                        }}
                                    >
                                        <DeleteIcon
                                            className="me-3"
                                            size="1.3rem"
                                            strokeWidth="2"
                                        />
                                        <span className="align-middle fw-semibold">
                                            {t('delete')}
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : studySet?._deleted ? (
                        ''
                    ) : (
                        userInfo?.id && (
                            <button
                                className="btn btn-outline-secondary icon-outline-secondary"
                                type="button"
                                onClick={() => {
                                    setShowReportModal(true)
                                }}
                            >
                                <ReportIcon size="1.3rem" strokeWidth="2" />
                            </button>
                        )
                    )}
                </div>
            </div>
            {/* Description */}
            <div className="setPageTermsHeader mb-3">
                <div className="setPageTermsHeading mb-1">
                    {t('description')}
                </div>
                <div>{studySet?.description || '...'}</div>
            </div>
            {/* Progress */}
            {userToken && (
                <div className="setPageProgress mb-4">
                    <div className="setPageTermsHeading mb-3">{t('ypro')}</div>
                    <div className="row">
                        {/* not studied */}
                        <div className="col-12 col-sm-4 mb-2 mb-sm-0">
                            <div
                                className="card setPageProgressLink"
                                disabled={numNot === 0}
                                onClick={() => {
                                    if (numNot !== 0) {
                                        navigate(`/learn/${id}?statusType=not`)
                                    }
                                }}
                            >
                                <div className="card-body">
                                    <div className="d-flex flex-row flex-sm-column flex-lg-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row flex-sm-column flex-lg-row align-items-center">
                                            <div className="progress blue">
                                                <span className="progress-left">
                                                    <span
                                                        className="progress-bar"
                                                        style={{
                                                            transform: `rotate(${numNotProgressLeft}deg)`,
                                                        }}
                                                    ></span>
                                                </span>
                                                <span className="progress-right">
                                                    <span
                                                        className="progress-bar"
                                                        style={{
                                                            transform: `rotate(${numNotProgressRight}deg)`,
                                                        }}
                                                    ></span>
                                                </span>
                                                <div className="progress-value">
                                                    {numNot}
                                                </div>
                                            </div>
                                            <h5 className="setPageProgressLabel m-0 ms-3 ms-sm-0 ms-lg-3">
                                                {t('nstudied')}
                                            </h5>
                                        </div>
                                        <span className="setPageProgressLink">
                                            {t('study')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* still learning */}
                        <div className="col-12 col-sm-4 mb-2 mb-sm-0">
                            <div
                                className="card setPageProgressLink"
                                disabled={numStill === 0}
                                onClick={() => {
                                    if (numStill !== 0) {
                                        navigate(
                                            `/learn/${id}?statusType=still`
                                        )
                                    }
                                }}
                            >
                                <div className="card-body">
                                    <div className="d-flex flex-row flex-sm-column flex-lg-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row flex-sm-column flex-lg-row align-items-center">
                                            <div className="progress yellow">
                                                <span className="progress-left">
                                                    <span
                                                        className="progress-bar"
                                                        style={{
                                                            transform: `rotate(${numStillProgressLeft}deg)`,
                                                        }}
                                                    ></span>
                                                </span>
                                                <span className="progress-right">
                                                    <span
                                                        className="progress-bar"
                                                        style={{
                                                            transform: `rotate(${numStillProgressRight}deg)`,
                                                        }}
                                                    ></span>
                                                </span>
                                                <div className="progress-value">
                                                    {numStill}
                                                </div>
                                            </div>
                                            <h5 className="setPageProgressLabel m-0 ms-3 ms-sm-0 ms-lg-3">
                                                {t('still')}
                                            </h5>
                                        </div>
                                        <span className="setPageProgressLink">
                                            {t('study')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* mastered */}
                        <div className="col-12 col-sm-4 mb-2 mb-sm-0">
                            <div
                                className="card setPageProgressLink"
                                disabled={numMaster === 0}
                                onClick={() => {
                                    if (numMaster !== 0) {
                                        navigate(
                                            `/learn/${id}?statusType=mastered`
                                        )
                                    }
                                }}
                            >
                                <div className="card-body">
                                    <div className="d-flex flex-row flex-sm-column flex-lg-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row flex-sm-column flex-lg-row align-items-center">
                                            <div className="progress green">
                                                <span className="progress-left">
                                                    <span
                                                        className="progress-bar"
                                                        style={{
                                                            transform: `rotate(${numMasterProgressLeft}deg)`,
                                                        }}
                                                    ></span>
                                                </span>
                                                <span className="progress-right">
                                                    <span
                                                        className="progress-bar"
                                                        style={{
                                                            transform: `rotate(${numMasterProgressRight}deg)`,
                                                        }}
                                                    ></span>
                                                </span>
                                                <div className="progress-value">
                                                    {numMaster}
                                                </div>
                                            </div>
                                            <h5 className="setPageProgressLabel m-0 ms-3 ms-sm-0 ms-lg-3">
                                                {t('master')}
                                            </h5>
                                        </div>
                                        <span className="setPageProgressLink">
                                            {t('study')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Details */}
            <div className="setPageTermsHeader d-flex align-items-center justify-content-between">
                <div className="setPageTermsHeading mb-2">
                    {t('termin')} ({numCards})
                </div>
                {userInfo?.id && (
                    <div className="d-flex align-items-center">
                        <div
                            className="btn-group me-2"
                            role="group"
                            aria-label="Basic radio toggle button group"
                        >
                            <input
                                type="radio"
                                className="btn-check"
                                name="filterStar"
                                id="allType"
                                checked={filterStar === 0}
                                disabled={numCards === 0}
                                onChange={() => {
                                    setFilterStar(0)
                                }}
                            />
                            <label
                                className="btn btn-outline-secondary btn-sm"
                                htmlFor="allType"
                            >
                                {t('all')}
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="filterStar"
                                id="starType"
                                checked={filterStar === 1}
                                disabled={numStars === 0}
                                onChange={() => {
                                    setFilterStar(1)
                                }}
                            />
                            <label
                                className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                                htmlFor="starType"
                            >
                                <StarSolidIcon size="1rem" />
                                <span className="ms-1">{numStars}</span>
                            </label>
                        </div>
                        <div className="dropdown setPageTermsHeader_controls">
                            <button
                                className="btn"
                                type="button dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                disabled={loadingFilter}
                            >
                                <span>{filterProgress}</span>
                                <ArrowDownIcon
                                    className="ms-2"
                                    size="1rem"
                                    strokeWidth="2"
                                />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-2">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setFilterProgress('All progress')
                                        }}
                                    >
                                        <span className="setPageTermHeader_dropdown">
                                            {t('allpro')}
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setFilterProgress('Not studied')
                                        }}
                                        disabled={
                                            filterStar
                                                ? numNotStar === 0
                                                : numNot === 0
                                        }
                                    >
                                        <span className="setPageTermHeader_dropdown">
                                            {t('nstudied')}
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setFilterProgress('Still learning')
                                        }}
                                        disabled={
                                            filterStar
                                                ? numStillStar === 0
                                                : numStill === 0
                                        }
                                    >
                                        <span className="setPageTermHeader_dropdown">
                                            {t('still')}
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => {
                                            setFilterProgress('Mastered')
                                        }}
                                        disabled={
                                            filterStar
                                                ? numMasterStar === 0
                                                : numMaster === 0
                                        }
                                    >
                                        <span className="setPageTermHeader_dropdown">
                                            {t('master')}
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            {/* Terms */}
            {loadingFilter ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    {cards.map((fullCard) => (
                        <ViewCard
                            fullCard={fullCard}
                            key={fullCard.card.id}
                            userInfo={userInfo}
                            showToast={showToast}
                            setShowToast={setShowToast}
                        />
                    ))}
                    {/* Pagination */}
                    {userInfo?.id ? (
                        <Pagination
                            className="mb-5"
                            currentPage={page}
                            totalCount={numCards}
                            pageSize={10}
                            onPageChange={(page) => {
                                setPage(page)
                            }}
                        />
                    ) : (
                        cards.length > 5 && (
                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setShowWarningModal(true)
                                    }}
                                >
                                    {t('vmore')}
                                </button>
                            </div>
                        )
                    )}
                </div>
            )}
            {/* delete set modal */}
            <DeleteSet
                studySet={studySet}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
            />
            {/* comment modal */}
            {showCommentModal && (
                <div className="setPage_editCardModal setPage_noteModal">
                    <div className="modal-content d-flex">
                        <button
                            className="btn close p-0 mb-3 text-end"
                            onClick={() => {
                                setShowCommentModal(false)
                            }}
                        >
                            <CloseIcon size="1.875rem" />
                        </button>
                        {/* add comment */}
                        {userInfo?.id && (
                            <div className="d-flex mb-3">
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
                                                    LoadingUpload...
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
                        {comments?.length === 0 ? (
                            <div>{t('nocmt')}</div>
                        ) : (
                            comments.map((comment, index) => (
                                <Comment
                                    key={comment.id}
                                    index={index}
                                    comments={comments}
                                    setComments={setComments}
                                    comment={comment}
                                    userInfo={userInfo}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
            {/* assign modal */}
            <AssignToClass
                showAssignModal={showAssignModal}
                setShowAssignModal={setShowAssignModal}
                studySet={studySet}
                userInfo={userInfo}
            />
            {/* report modal */}
            <Report
                showReportModal={showReportModal}
                setShowReportModal={setShowReportModal}
                userInfo={userInfo}
                destination={`studySet/${id}`}
            />
            {/* warning modal */}
            <Modal
                className="mt-5"
                show={showWarningModal}
                onHide={() => {
                    setShowWarningModal(false)
                }}
            >
                <Modal.Header className="border-0" closeButton>
                    <Modal.Title>{t('msg35')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('msg36')}?</Modal.Body>
                <Modal.Footer className="border-0">
                    <button
                        className="btn btn-light"
                        onClick={() => {
                            setShowWarningModal(false)
                        }}
                    >
                        {t('later')}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            navigate('/login')
                        }}
                    >
                        {t('msg37')}
                    </button>
                </Modal.Footer>
            </Modal>
            {/* toast error */}
            <ToastContainer
                className="p-3 mt-5 position-sticky"
                position="bottom-start"
                style={{ zIndex: 99999 }}
            >
                <Toast
                    show={showToast}
                    bg="danger"
                    onClose={() => {
                        setShowToast(false)
                    }}
                    delay={3000}
                    autohide
                >
                    <Toast.Body className="text-white">
                        File is bigger than 20MB!
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default ViewStudySet
