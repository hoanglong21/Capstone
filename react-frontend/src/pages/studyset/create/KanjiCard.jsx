import { useEffect, useState } from 'react'

import { uploadFile, deleteFileByUrl } from '../../../features/fileManagement'
import ContentService from '../../../services/ContentService'
import CardService from '../../../services/CardService'

import { DeleteIcon, ImageIcon, MicIcon } from '../../../components/icons'
import TextEditor from '../../../components/TextEditor'
import styles from '../../../assets/styles/Card.module.css'

export const KanjiCard = (props) => {
    const [card, setCard] = useState(props.card)
    const [character, setCharacter] = useState({})
    const [name, setName] = useState({})
    const [gradeLevel, setGradeLevel] = useState({})
    const [strokes, setStrokes] = useState({})
    const [jlptLevel, setJlptLevel] = useState({})
    const [radical, setRadical] = useState({})
    const [onyomi, setOnyomi] = useState({})
    const [kunyomi, setKunyomi] = useState({})
    const [meanings, setMeanings] = useState({})
    const [strokeOrder, setStrokeOrder] = useState({})
    const [example, setExample] = useState({})
    const [loadingPicture, setLoadingPicture] = useState(false)
    const [loadingAudio, setLoadingAudio] = useState(false)

    //fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const contents = (await ContentService.getAllByCardId(card.id))
                    .data
                if (contents.length === 0) {
                    setCharacter(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 4,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setName(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 5,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setGradeLevel(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 6,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setStrokes(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 7,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setJlptLevel(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 8,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setRadical(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 9,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setOnyomi(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 10,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setKunyomi(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 11,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setMeanings(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 12,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setStrokeOrder(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 13,
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
                                    id: 14,
                                },
                                content: '',
                            })
                        ).data
                    )
                } else {
                    setCharacter(contents[0])
                    setName(contents[1])
                    setGradeLevel(contents[2])
                    setStrokes(contents[3])
                    setJlptLevel(contents[4])
                    setRadical(contents[5])
                    setOnyomi(contents[6])
                    setKunyomi(contents[7])
                    setMeanings(contents[8])
                    setStrokeOrder(contents[9])
                    setExample(contents[10])
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        fetchData()
    }, [card.id])

    // ignore error
    // useEffect(() => {
    //     window.addEventListener('error', (e) => {
    //         if (e.message === 'ResizeObserver loop limit exceeded') {
    //             const resizeObserverErrDiv = document.getElementById(
    //                 'webpack-dev-server-client-overlay-div'
    //             )
    //             const resizeObserverErr = document.getElementById(
    //                 'webpack-dev-server-client-overlay'
    //             )
    //             if (resizeObserverErr) {
    //                 resizeObserverErr.setAttribute('style', 'display: none')
    //             }
    //             if (resizeObserverErrDiv) {
    //                 resizeObserverErrDiv.setAttribute('style', 'display: none')
    //             }
    //         }
    //     })
    // }, [])

    const doUpdatecard = async (tempcard) => {
        await CardService.updatecard(tempcard.id, tempcard)
    }

    const handleChangeFile = async (event, folderName) => {
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(true) : setLoadingAudio(true)
        const file = event.target.files[0]
        if (file) {
            const urlOld = String(card[name])
            const url = await uploadFile(file, folderName)
            const tempcard = { ...card, [name]: url }
            setCard(tempcard)
            if (urlOld) {
                deleteFileByUrl(urlOld, folderName)
            }
            doUpdatecard(tempcard)
        }
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
    }

    const handleDeleteFile = (event, folderName) => {
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
        const urlOld = card[name]
        const tempcard = { ...card, [name]: '' }
        setCard(tempcard)
        if (urlOld) {
            deleteFileByUrl(urlOld, folderName)
        }
        doUpdatecard(tempcard)
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
    }

    const doUpdateContent = async (content) => {
        try {
            await ContentService.updateContent(content.id, content)
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
                            onChange={(event) =>
                                handleChangeFile(event, 'image')
                            }
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
                            onChange={(event) =>
                                handleChangeFile(event, 'audio')
                            }
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
                    <div className="col-6 pe-4">
                        <TextEditor
                            name="character"
                            data={character.content}
                            onChange={(event, editor) => {
                                setCharacter({
                                    ...character,
                                    content: editor.getData(),
                                })
                            }}
                            onBlur={() => doUpdateContent(character)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            CHARACTER
                        </span>
                    </div>
                    <div className="col-6 ps-4">
                        <TextEditor
                            name="name"
                            data={name.content}
                            onChange={(event, editor) => {
                                setName({
                                    ...name,
                                    content: editor.getData(),
                                })
                            }}
                            onBlur={() => doUpdateContent(name)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            NAME
                        </span>
                    </div>
                    <div className="col-12 mt-4">
                        <TextEditor
                            name="gradeLevel"
                            data={gradeLevel.content}
                            onChange={(event, editor) => {
                                setGradeLevel({
                                    ...gradeLevel,
                                    content: editor.getData(),
                                })
                            }}
                            onBlur={() => doUpdateContent(gradeLevel)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            GRADE LEVEL
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
                                            handleDeleteFile(event, 'image')
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
                                            handleDeleteFile(event, 'audio')
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
