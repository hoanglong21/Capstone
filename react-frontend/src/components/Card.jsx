import { useState } from 'react'

import { uploadFile } from '../features/fileManagement'

import { DeleteIcon, ImageIcon, MicIcon } from './icons'
import TextEditor from './TextEditor'
import styles from '../assets/styles/Card.module.css'

export const Card = (props) => {
    const [card, setCard] = useState({
        picture: '',
        audio: '',
    })
    const [term, setTerm] = useState({ field: '', content: '' })
    const [definition, setDefinition] = useState({ field: '', content: '' })

    const handleChangeFile = (event) => {
        const file = event.target.files[0]
        if (file) {
            setCard({ ...card, [event.target.name]: file })
        }
    }

    const handleDeleteFile = (event) => {
        setCard({ ...card, [event.target.name]: null })
    }

    return (
        <div className={`card ${styles.card} mb-3`} id={props.index}>
            <div
                className={`card-header ${styles.card_header} d-flex justify-content-between align-items-center mb-1`}
            >
                <span className={styles.card_header_label}>
                    {props.index + 1}
                </span>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <input
                            type="file"
                            id="uploadImage"
                            accept="image/*"
                            name="picture"
                            className={styles.file_upload}
                            onChange={handleChangeFile}
                        />
                        <label htmlFor="uploadImage">
                            <ImageIcon className="ms-3 icon-warning" />
                        </label>
                    </div>
                    <div>
                        <input
                            type="file"
                            id="uploadAudio"
                            accept="audio/*"
                            name="audio"
                            className={styles.file_upload}
                            onChange={handleChangeFile}
                        />
                        <label htmlFor="uploadAudio">
                            <MicIcon className="ms-3 icon-warning" />
                        </label>
                    </div>
                    <button
                        type="button"
                        className="btn"
                        onClick={props.handleDelete}
                    >
                        <DeleteIcon className="icon-warning" />
                    </button>
                </div>
            </div>
            <div className={`card-body ${styles.card_body}`}>
                <div className="row">
                    <div className="col-6 d-flex flex-column">
                        <TextEditor />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            TERM
                        </span>
                    </div>
                    <div className="col-6 d-flex flex-column">
                        <TextEditor />
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
                                    src={URL.createObjectURL(card.picture)}
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
                                <audio
                                    controls
                                    src={URL.createObjectURL(card.audio)}
                                ></audio>
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
