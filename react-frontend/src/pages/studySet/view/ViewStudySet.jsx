import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import StudySetService from '../../../services/StudySetService'
import CardService from '../../../services/CardService'

import ViewCard from './ViewCard'
import DeleteSet from '../DeleteSet'

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
} from '../../../components/icons'
import './viewStudySet.css'

const ViewStudySet = () => {
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [studySet, setStudySet] = useState({})
    const [cards, setCards] = useState([])
    const [numCards, setNumCards] = useState(0)

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

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // study set
                const tempStudySet = (await StudySetService.getStudySetById(id))
                    .data
                setStudySet(tempStudySet)
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
                const tempNumCards =
                    tempCounts['Not studied'] +
                    tempCounts['Still learning'] +
                    tempCounts['Mastered']
                setNumCards(tempNumCards)
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
                    tempNumStillProgress > 180 ? tempNumStillProgress - 180 : 0
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
                // cards
                const tempCards = (
                    await CardService.getFilterCard(
                        `=${userInfo.id}`,
                        `=${tempStudySet.id}`,
                        '=not studied,still learning,mastered',
                        '=0',
                        '',
                        '',
                        '',
                        ''
                    )
                ).data.list
                setCards(tempCards)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (id && userInfo?.id) {
            fetchData()
        }
    }, [id, userInfo])

    function checkAuth() {
        if (!userToken) {
            navigate('/login')
        }
    }

    return (
        <div className="container setPageContainer">
            <div className="setTitle">
                <h2>{studySet?.title}</h2>
            </div>
            {/* Modes */}
            <div className="row mb-4">
                <div className="studyset-col-4">
                    <Link
                        to={`/flashcards/${studySet.id}`}
                        className="studyModesItem d-flex align-items-center justify-content-center"
                    >
                        <StudySetSolidIcon
                            className="StudyModesIcon"
                            size="2rem"
                        />
                        <span className="studyModesItemName">Flashcards</span>
                    </Link>
                </div>
                <div className="studyset-col-4">
                    <Link
                        to={`/learn/${studySet.id}`}
                        className="studyModesItem d-flex align-items-center justify-content-center"
                    >
                        <LearnSolidIcon
                            className="StudyModesIcon"
                            size="2rem"
                        />
                        <span className="studyModesItemName" href="/learn">
                            Learn
                        </span>
                    </Link>
                </div>
                <div className="studyset-col-4">
                    <Link
                        to={`/quiz/${studySet.id}`}
                        className="studyModesItem d-flex align-items-center justify-content-center"
                    >
                        <TestSolidIcon className="StudyModesIcon" size="2rem" />
                        <span className="studyModesItemName">Quiz</span>
                    </Link>
                </div>
            </div>
            {/* Author + Options */}
            <div className="setPageInformation d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="setAuthorAvatar">
                        <img
                            alt="avatarAuthor"
                            className="w-100 h-100"
                            src={
                                studySet?.user?.avatar
                                    ? studySet.user.avatar
                                    : defaultAvatar
                            }
                        />
                    </div>
                    <div className="setAuthorInfo ms-2">
                        <span className="setAuthorInfo_createdBy">
                            Created by
                        </span>
                        <span className="setAuthorInfo_username">
                            {studySet?.user?.username}
                        </span>
                    </div>
                </div>
                <div className="dropdown setPageOptions d-flex align-items-center justify-content-center">
                    <button
                        type="button dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <OptionHorIcon />
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button
                                className="dropdown-item py-2 px-3 d-flex align-items-center"
                                type="button"
                                onClick={() => checkAuth()}
                            >
                                <AddCircleIcon
                                    className="me-3"
                                    size="1.3rem"
                                    strokeWidth="2"
                                />
                                <span className="align-middle fw-semibold">
                                    Add to a class
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item py-2 px-3 d-flex align-items-center"
                                type="button"
                                onClick={() => {
                                    navigate(`/edit-set/${id}`)
                                }}
                            >
                                <EditIcon className="me-3" size="1.3rem" />
                                <span className="align-middle fw-semibold">
                                    Edit
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
                                    Delete
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Progress */}
            <div className="setPageTermsHeader">
                <div className="setPageTermsHeading">Your Progress</div>
                <div className="row">
                    {/* not studied */}
                    <div className="col-4">
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
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
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
                                        <h5 className="setPageProgressLabel m-0 ms-3">
                                            Not studied
                                        </h5>
                                    </div>
                                    <span className="setPageProgressLink">
                                        Study
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* still learning */}
                    <div className="col-4">
                        <div
                            className="card setPageProgressLink"
                            disabled={numStill === 0}
                            onClick={() => {
                                if (numStill !== 0) {
                                    navigate(`/learn/${id}?statusType=still`)
                                }
                            }}
                        >
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
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
                                        <h5 className="setPageProgressLabel m-0 ms-3">
                                            Still learning
                                        </h5>
                                    </div>
                                    <span className="setPageProgressLink">
                                        Study
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* mastered */}
                    <div className="col-4">
                        <div
                            className="card setPageProgressLink"
                            disabled={numMaster === 0}
                            onClick={() => {
                                if (numMaster !== 0) {
                                    navigate(`/learn/${id}?statusType=mastered`)
                                }
                            }}
                        >
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
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
                                        <h5 className="setPageProgressLabel m-0 ms-3">
                                            Mastered
                                        </h5>
                                    </div>
                                    <span className="setPageProgressLink">
                                        Study
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Details */}
            <div className="setPageTermsHeader d-flex align-items-center justify-content-between">
                <span className="setPageTermsHeading">
                    Terms in this set ({numCards})
                </span>
                <div className="dropdown setPageTermsHeader_controls">
                    <button
                        type="button dropdown-toggle"
                        data-bs-toggle="dropdown"
                        className="setPageTermsHeader_btn"
                        aria-expanded="false"
                    >
                        <span>Original</span>
                        <ArrowDownIcon
                            className="ms-2"
                            size="1rem"
                            strokeWidth="2"
                        />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-2">
                        <li>
                            <button
                                className="dropdown-item py-1"
                                type="button"
                            >
                                <span className="setPageTermHeader_dropdown">
                                    Original
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item py-1"
                                type="button"
                            >
                                <span className="setPageTermHeader_dropdown">
                                    Alphabetical
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item py-1"
                                type="button"
                            >
                                <span className="setPageTermHeader_dropdown">
                                    Your stats
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Terms */}
            <div className="setPageTerms">
                {cards.map((fullCard) => (
                    <ViewCard
                        fullCard={fullCard}
                        key={fullCard.card.id}
                        userInfo={userInfo}
                    />
                ))}
            </div>
            {/* delete set modal */}
            <DeleteSet
                studySet={studySet}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
            />
        </div>
    )
}

export default ViewStudySet
