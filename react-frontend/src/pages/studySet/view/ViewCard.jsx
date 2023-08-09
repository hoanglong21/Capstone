import { useEffect, useState } from 'react'

import {
    MicIconSolid,
    CloseIcon,
    DeleteIcon,
    ImageIcon,
    ImageSolidIcon,
    MicIcon,
    NoteSolidIcon,
    OptionVerIcon,
    StarSolidIcon,
} from '../../../components/icons'
import NoteEditor from '../../../components/textEditor/NoteEditor'
import ProgressService from '../../../services/ProgressService'
import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'

const ViewCard = ({ fullCard, userInfo }) => {
    const [card, setCard] = useState({})
    const [progress, setProgress] = useState({})

    const [term, setTerm] = useState('')
    const [definition, setDefinition] = useState('')
    const [picture, setPicture] = useState('')
    const [audio, setAudio] = useState('')
    const [note, setNote] = useState('')

    const [showPicture, setShowPicture] = useState(false)
    const [showAudio, setShowAudio] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [loadingPicture, setLoadingPicture] = useState(false)
    const [loadingAudio, setLoadingAudio] = useState(false)

    const [showButton, setShowButton] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            // card
            setCard(fullCard.card)
            // content
            const tempContents = fullCard.content
            const type = fullCard.card.studySet.studySetType.id
            setTerm(tempContents[0]?.content)
            if (type === 1) {
                setDefinition(tempContents[1]?.content)
            } else if (type === 2) {
                setDefinition(tempContents[1]?.content)
            } else if (type === 3) {
                setDefinition(tempContents[2]?.content)
            }
            // progress
            if (fullCard?.progress?.id) {
                setPicture(fullCard.progress.picture)
                setAudio(fullCard.progress.audio)
                setNote(fullCard.progress.note)
                setProgress(fullCard.progress)
            }
        }
        if (fullCard?.card?.id) {
            fetchData()
        }
    }, [fullCard?.card])

    useEffect(() => {
        if (showNote || showPicture || showAudio) {
            document
                .getElementsByTagName('body')[0]
                .classList.add('setPage_modalOpen')
        } else {
            document
                .getElementsByTagName('body')[0]
                .classList.remove('setPage_modalOpen')
        }
    }, [showNote, showPicture, showAudio])

    const handleChangeFile = async (event) => {
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(true) : setLoadingAudio(true)
        const file = event.target.files[0]
        if (file) {
            name === 'picture' ? setPicture(file) : setAudio(file)
        }
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
    }

    const handleDeleteFile = async (event) => {
        const name = event.target.name
        name === 'picture' ? setPicture('') : setAudio('')
    }

    const handleSave = async () => {
        setLoading(true)
        var tempCard = { ...card }
        tempCard.studySet.created_date = toBEDate(
            tempCard.studySet.created_date
        )
        tempCard.studySet.user.created_date = toBEDate(
            tempCard.studySet.user.created_date
        )
        var tempUser = {
            ...userInfo,
            created_date: toBEDate(userInfo.created_date),
        }
        var tempProgress = {
            user: tempUser,
            card: tempCard,
            star: progress?.id ? progress?._star : 0,
            note: note,
        }
        try {
            if (progress?.id) {
                // delete old
                if (picture?.type && progress?.picture) {
                    await deleteFileByUrl(
                        progress.picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                }
                if (audio?.type && progress?.audio) {
                    await deleteFileByUrl(
                        progress.audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                }
                // upload new
                var tempPicture = picture
                if (picture && picture != progress.picture) {
                    tempPicture = await uploadFile(
                        picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                    setPicture(tempPicture)
                }
                var tempAudio = audio
                if (audio && audio != progress.audio) {
                    tempAudio = await uploadFile(
                        audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                    setAudio(tempAudio)
                }
                tempProgress = {
                    ...tempProgress,
                    picture: tempPicture,
                    audio: tempAudio,
                }
            } else {
                tempProgress = (
                    await ProgressService.customUpdateProgress(tempProgress)
                ).data
                // upload new
                var tempPicture = picture
                if (picture) {
                    tempPicture = await uploadFile(
                        picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${tempProgress.id}`
                    )
                    setPicture(tempPicture)
                }
                var tempAudio = audio
                if (audio) {
                    tempAudio = await uploadFile(
                        audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${tempProgress.id}`
                    )
                    setAudio(tempAudio)
                }
                tempProgress = {
                    ...tempProgress,
                    picture: tempPicture,
                    audio: tempAudio,
                }
            }
            tempProgress = (
                await ProgressService.customUpdateProgress(tempProgress)
            ).data
            setProgress(tempProgress)
            setShowNote(false)
            setShowPicture(false)
            setShowAudio(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const handleCancel = () => {
        setShowNote(false)
        setShowPicture(false)
        setShowAudio(false)
        setPicture(progress?.picture || '')
        setAudio(progress?.audio || '')
        setNote(progress?.note || '')
    }

    function getUrl(file) {
        try {
            return URL.createObjectURL(file)
        } catch (error) {
            return file
        }
    }

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    const handleChangeStar = async () => {
        var tempCard = { ...card }
        tempCard.studySet.created_date = toBEDate(
            tempCard.studySet.created_date
        )
        tempCard.studySet.user.created_date = toBEDate(
            tempCard.studySet.user.created_date
        )
        var tempUser = {
            ...userInfo,
            created_date: toBEDate(userInfo.created_date),
        }
        var tempProgress = {
            user: tempUser,
            card: tempCard,
            star: progress?.id ? !progress?._star : 0,
            audio: audio,
            picture: picture,
            note: note,
        }
        try {
            tempProgress = (
                await ProgressService.customUpdateProgress(tempProgress)
            ).data
            setProgress(tempProgress)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <div
            className="setPageTerm mb-3"
            onMouseEnter={() => {
                setShowButton(true)
            }}
            onMouseLeave={(event) => {
                setShowButton(false)
                if (
                    document
                        .querySelector(`#editCardBtn${card?.id} .dropdown-menu`)
                        ?.classList.contains('show')
                ) {
                    document
                        .querySelector(`#editCardBtn${card?.id} > button`)
                        ?.click()
                }
            }}
        >
            <div className="row">
                <div
                    className="col-3 d-flex align-items-center"
                    style={{ borderRight: '0.125rem solid #f6f7fb' }}
                >
                    <div className="setPageTerm_termText">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: term ? term : '...',
                            }}
                        ></div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="setPageTerm_definitionText">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: definition ? definition : '...',
                                }}
                            ></div>
                        </div>
                        <div className="setPageTerm_imageWrap d-flex align-items-center">
                            {card.picture && <img src={card?.picture} />}
                        </div>
                    </div>
                </div>
                <div className="col-1" id={`editCardBtn${card?.id}`}>
                    {showButton && (
                        <button
                            type="button dropdown-toggle"
                            className="btn btn-customLight"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <OptionVerIcon />
                        </button>
                    )}
                    <ul className="dropdown-menu">
                        {/* star */}
                        <li>
                            <button
                                className={`setPageTerm_btn dropdown-item d-flex align-items-center ${
                                    progress?._star ? 'star' : ''
                                }`}
                                onClick={handleChangeStar}
                            >
                                <StarSolidIcon size="20px" className="me-2" />
                                Star
                            </button>
                        </li>
                        {/* picture */}
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                onClick={() => {
                                    setShowPicture(true)
                                }}
                            >
                                <ImageSolidIcon size="20px" className="me-2" />
                                Picture
                            </button>
                        </li>
                        {/* audio */}
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                onClick={() => {
                                    setShowAudio(true)
                                }}
                            >
                                <MicIconSolid size="20px" className="me-2" />
                                Audio
                            </button>
                        </li>
                        {/* note */}
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                onClick={() => {
                                    setShowNote(true)
                                }}
                            >
                                <NoteSolidIcon size="20px" className="me-2" />
                                Note
                            </button>
                        </li>
                    </ul>
                    {/* note modal */}
                    {showNote && (
                        <div className="setPage_editCardModal setPage_noteModal">
                            <div className="modal-content d-flex">
                                <button
                                    className="close p-0 mb-3 text-end"
                                    onClick={handleCancel}
                                >
                                    <CloseIcon size="1.875rem" />
                                </button>
                                <div className="setPage_noteEditor flex-grow-1">
                                    <NoteEditor
                                        data={note}
                                        onChange={(event, editor) => {
                                            setNote(editor.getData())
                                        }}
                                    />
                                </div>
                                <div className="d-flex justify-content-end mt-5">
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* picture modal */}
                    {showPicture && (
                        <div className="setPage_editCardModal setPage_pictureModal">
                            <div className="modal-content d-flex">
                                <button
                                    className="close p-0 mb-3 text-end"
                                    onClick={handleCancel}
                                >
                                    <CloseIcon size="1.875rem" />
                                </button>
                                <div className="flex-grow-1">
                                    {picture ? (
                                        <div className="ms-2 setPage_pictureWrapper">
                                            <img src={getUrl(picture)} />
                                            <button
                                                type="button"
                                                name="picture"
                                                className="btn btn-danger p-1 rounded-circle"
                                                onClick={(event) =>
                                                    handleDeleteFile(event)
                                                }
                                            >
                                                <DeleteIcon size="1.125rem" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="uploadProgressPicture"
                                            className="d-flex justify-content-center align-items-center setPage_uploadImage"
                                        >
                                            <input
                                                type="file"
                                                id="uploadProgressPicture"
                                                name="picture"
                                                className="d-none"
                                                accept="image/*"
                                                onClick={(event) => {
                                                    event.target.value = null
                                                }}
                                                onChange={(event) =>
                                                    handleChangeFile(event)
                                                }
                                            />
                                            {loadingPicture ? (
                                                <div
                                                    className="spinner-border text-secondary"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        LoadingUpload...
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="d-flex flex-column align-items-center">
                                                    <ImageIcon
                                                        className="icon-warning"
                                                        size="2.5rem"
                                                    />
                                                    <div>Add picture</div>
                                                </div>
                                            )}
                                        </label>
                                    )}
                                </div>
                                <div className="d-flex justify-content-end mt-5">
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* audio modal */}
                    {showAudio && (
                        <div className="setPage_editCardModal setPage_audioModal">
                            <div className="modal-content d-flex">
                                <button
                                    className="close p-0 mb-3 text-end"
                                    onClick={handleCancel}
                                >
                                    <CloseIcon size="1.875rem" />
                                </button>
                                <div className="flex-grow-1">
                                    {audio ? (
                                        <div className="ms-2 setPage_audioWrapper">
                                            <audio
                                                controls
                                                src={getUrl(audio)}
                                            />
                                            <button
                                                type="button"
                                                name="audio"
                                                className="btn btn-danger p-1 rounded-circle"
                                                onClick={(event) =>
                                                    handleDeleteFile(event)
                                                }
                                            >
                                                <DeleteIcon size="1.125rem" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="uploadProgressPicture"
                                            className="d-flex justify-content-center align-items-center setPage_uploadImage"
                                        >
                                            <input
                                                type="file"
                                                id="uploadProgressPicture"
                                                name="audio"
                                                className="d-none"
                                                accept="audio/*"
                                                onClick={(event) => {
                                                    event.target.value = null
                                                }}
                                                onChange={(event) =>
                                                    handleChangeFile(event)
                                                }
                                            />
                                            {loadingAudio ? (
                                                <div
                                                    className="spinner-border text-secondary"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        LoadingUpload...
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="d-flex flex-column align-items-center">
                                                    <MicIcon
                                                        className="icon-warning"
                                                        size="1.75rem"
                                                    />
                                                    <div>Add audio</div>
                                                </div>
                                            )}
                                        </label>
                                    )}
                                </div>
                                <div className="d-flex justify-content-end mt-5">
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ViewCard
