import { useEffect, useState } from 'react'

import { uploadFile, deleteFile } from '../features/fileManagement'

import { DeleteIcon, ImageIcon, MicIcon } from './icons'
import TextEditor from './TextEditor'
import styles from '../assets/styles/Card.module.css'
import ContentService from '../services/ContentService'
import CardService from '../services/CardService'

export const Card = (props) => {
    const [card, setCard] = useState(props.card)
    const [term, setTerm] = useState(card.contents[0])
    const [definition, setDefinition] = useState(card.contents[1])

    useEffect(() => {
        // ignore error
        window.addEventListener('error', (e) => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
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
            }
        })
    }, [])

    const doUpdateCard = async (tempCard) => {
        await CardService.updateCard(tempCard.id, tempCard)
    }

    const handleChangeFile = async (event) => {
        const file = event.target.files[0]
        const name = event.target.name
        if (file) {
            const urlOld = String(card[name])
            const url = await uploadFile(file)
            const tempCard = { ...card, [name]: url }
            setCard(tempCard)
            if (urlOld) {
                // deleteFile(urlOld)
            }
            doUpdateCard(tempCard)
        }
    }

    const handleDeleteFile = (event) => {
        const name = event.target.name
        const urlOld = String(card[name])
        const tempCard = { ...card, [name]: '' }
        setCard(tempCard)
        if (urlOld) {
            // deleteFile(urlOld)
        }
        doUpdateCard(tempCard)
    }

    const handleChangeTerm = (event, editor) => {
        setTerm({ ...term, content: editor.getData() })
    }

    const handleChangeDefinition = (event, editor) => {
        setDefinition({ ...definition, content: editor.getData() })
    }

    const doUpdateTerm = async () => {
        await ContentService.updateContent(term.id, term)
    }

    const doUpdateDefinition = async () => {
        await ContentService.updateContent(definition.id, definition)
    }

    return (
        <div className={`card ${styles.card} mb-3`} id={props.index}>
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
                            onChange={handleChangeFile}
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
                            onChange={handleChangeFile}
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
                    <div className="col pe-4">
                        <TextEditor
                            name="term"
                            data={term.content}
                            onChange={handleChangeTerm}
                            onBlur={doUpdateTerm}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            TERM
                        </span>
                    </div>
                    <div className="col ps-4">
                        <TextEditor
                            name="definition"
                            data={definition.content}
                            onChange={handleChangeDefinition}
                            onBlur={doUpdateDefinition}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            DEFINITION
                        </span>
                    </div>
                </div>
            </div>
            {(card.picture || card.audio) && (
                <div className={`card-footer ${styles.card_footer} p-3`}>
                    <div className="row">
                        {card.picture && (
                            <div className="col-6 d-flex align-items-center">
                                <img
                                    src={card.picture}
                                    className={styles.image_upload}
                                    alt="user upload"
                                />
                                <button
                                    type="button"
                                    name="picture"
                                    className={`btn btn-danger ms-5 p-0 rounded-circle ${styles.btn_del}`}
                                    onClick={handleDeleteFile}
                                >
                                    <DeleteIcon size="1.25rem" />
                                </button>
                            </div>
                        )}
                        {card.audio && (
                            <div className="col-6 d-flex align-items-center ">
                                <audio controls src={card.audio}></audio>
                                <button
                                    type="button"
                                    name="audio"
                                    className={`btn btn-danger ms-5 p-0 rounded-circle ${styles.btn_del}`}
                                    onClick={handleDeleteFile}
                                >
                                    <DeleteIcon size="1.25rem" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
