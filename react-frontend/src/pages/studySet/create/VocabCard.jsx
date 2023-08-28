import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { uploadFile, deleteFileByUrl } from '../../../features/fileManagement'
import ContentService from '../../../services/ContentService'
import CardService from '../../../services/CardService'

import { DeleteIcon, ImageIcon, MicIcon } from '../../../components/icons'
import CardEditor from '../../../components/textEditor/CardEditor'
import styles from '../../../assets/styles/Card.module.css'

export const VocabCard = (props) => {
    const navigate = useNavigate()

    const [card, setCard] = useState(props.card)
    const [term, setTerm] = useState({})
    const [definition, setDefinition] = useState({})
    const [example, setExample] = useState({})
    const [loadingPicture, setLoadingPicture] = useState(false)
    const [loadingAudio, setLoadingAudio] = useState(false)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    //fetch data
    useEffect(() => {
        const fetchData = async () => {
            props.setLoading(true)
            try {
                var contents = (await ContentService.getAllByCardId(card.id))
                    .data
                if (contents.length === 0) {
                    setTerm(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 1,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setDefinition(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 2,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setExample(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 3,
                                },
                                content: '',
                            })
                        ).data
                    )
                } else {
                    var tempCard = {...card}
                    if (tempCard?.studySet) {
                        tempCard.studySet.created_date = toBEDate(tempCard.studySet.created_date)
                        tempCard.studySet.deleted_date = toBEDate(tempCard.studySet.deleted_date)
                        if (tempCard.studySet?.user) {
                            tempCard.studySet.user.created_date = toBEDate(tempCard.studySet.user.created_date)
                            tempCard.studySet.user.dob = toBEDate(tempCard.studySet.user.dob)
                        }
                    }
                    setTerm({ ...contents[0], card: { ...tempCard } })
                    setDefinition({ ...contents[1], card: { ...tempCard } })
                    setExample({ ...contents[2], card: { ...tempCard } })
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
            props.setLoading(false)
        }
        fetchData()
    }, [card.id])

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

    const doUpdateCard = async (tempCard) => {
        props.setSaving(true)
        try {
            await CardService.updateCard(tempCard.id, tempCard)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        props.setSaving(false)
    }

    const handleChangeFile = async (event) => {
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(true) : setLoadingAudio(true)
        const file = event.target.files[0]
        if (file) {
            try {
                if (file.size > 20 * 1024 * 1024) {
                    props.setShowToast(true)
                    return
                }
                props.setSaving(true)
                const urlOld = String(card[name])
                const url = await uploadFile(
                    file,
                    `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}`
                )
                const tempCard = { ...card, [name]: url }
                setCard(tempCard)
                if (urlOld) {
                    await deleteFileByUrl(
                        urlOld,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}`
                    )
                }
                doUpdateCard(tempCard)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
        props.setSaving(false)
    }

    const handleDeleteFile = async (event) => {
        props.setSaving(true)
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
        const urlOld = card[name]
        const tempCard = { ...card, [name]: '' }
        setCard(tempCard)
        if (urlOld) {
            try {
                await deleteFileByUrl(
                    urlOld,
                    `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}`
                )
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        doUpdateCard(tempCard)
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
        props.setSaving(false)
    }

    const doUpdateContent = async (content) => {
        props.setSaving(true)
        try {
            await ContentService.updateContent(content.id, content)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        props.setSaving(false)
    }

    return (
        <div
            className={`card ${styles.card} mb-3`}
            index={props.index}
            id={card.id}
        >
            <div
                className={`card-header ${styles.card_header} d-flex justify-content-between align-items-center mb-1 px-4`}
            >
                <span className={styles.card_header_label}>
                    {props.index + 1}
                </span>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <input
                            type="file"
                            id={`uploadImage${props.index}`}
                            accept="image/*"
                            name="picture"
                            className={styles.file_upload}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            onChange={(event) => handleChangeFile(event)}
                        />
                        <label htmlFor={`uploadImage${props.index}`}>
                            <ImageIcon className="ms-3 icon-warning" />
                        </label>
                    </div>
                    <div>
                        <input
                            type="file"
                            id={`uploadAudio${props.index}`}
                            accept="audio/*"
                            name="audio"
                            className={styles.file_upload}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            onChange={(event) => handleChangeFile(event)}
                        />
                        <label htmlFor={`uploadAudio${props.index}`}>
                            <MicIcon className="ms-3 icon-warning" />
                        </label>
                    </div>
                    <button
                        type="button"
                        className="btn pe-0"
                        onClick={props.handleDelete}
                    >
                        <DeleteIcon className="icon-warning" />
                    </button>
                </div>
            </div>
            <div className={`card-body ${styles.card_body}`}>
                <div className="row px-2 py-1">
                    <div className="col-6 pe-4 d-flex flex-column justify-content-end">
                        <CardEditor
                            name="term"
                            data={term?.content}
                            onChange={(event, editor) => {
                                if (term?.id) {
                                    setTerm({
                                        ...term,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(term)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            {t('term')}
                        </span>
                    </div>
                    <div className="col-6 ps-4 d-flex flex-column justify-content-end">
                        <CardEditor
                            name="definition"
                            data={definition?.content}
                            onChange={(event, editor) => {
                                if (definition?.id) {
                                    setDefinition({
                                        ...definition,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(definition)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            {t('definition')}
                        </span>
                    </div>
                    <div className="col-12 mt-4">
                        <CardEditor
                            name="example"
                            data={example?.content}
                            onChange={(event, editor) => {
                                if (example?.id) {
                                    setExample({
                                        ...example,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(example)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            {t('example')}
                        </span>
                    </div>
                </div>
            </div>
            {(loadingPicture || loadingAudio || card.picture || card.audio) && (
                <div className={`card-footer ${styles.card_footer} p-3`}>
                    <div className="row">
                        <div className="col-6 d-flex flex-column align-items-center">
                            {loadingPicture && (
                                <div
                                    className="spinner-border text-secondary mb-3"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        LoadingUpload...
                                    </span>
                                </div>
                            )}
                            {!loadingPicture && card.picture && (
                                <div className="d-flex align-self-start align-items-center">
                                    <img
                                        src={card.picture}
                                        className={styles.image_upload}
                                        alt="user upload"
                                    />
                                    <button
                                        type="button"
                                        name="picture"
                                        className={`btn btn-danger ms-5 p-0 rounded-circle ${styles.btn_del}`}
                                        onClick={(event) =>
                                            handleDeleteFile(event)
                                        }
                                    >
                                        <DeleteIcon size="1.25rem" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="col-6 d-flex flex-column align-items-center">
                            {loadingAudio && (
                                <div
                                    className="spinner-border text-secondary mb-3"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        LoadingUpload...
                                    </span>
                                </div>
                            )}
                            {!loadingAudio && card.audio && (
                                <div className="d-flex align-self-start align-items-center">
                                    <audio controls src={card.audio}></audio>
                                    <button
                                        type="button"
                                        name="audio"
                                        className={`btn btn-danger ms-5 p-0 rounded-circle ${styles.btn_del}`}
                                        onClick={(event) =>
                                            handleDeleteFile(event)
                                        }
                                    >
                                        <DeleteIcon size="1.25rem" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
