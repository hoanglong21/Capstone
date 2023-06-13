import { useState } from 'react'

import { uploadFile } from '../../features/uploadFile'

import { DeleteIcon, ImageIcon, MicIcon } from '../../components/icons'
import TextEditor from '../../components/TextEditor'
import styles from '../../assets/styles/Card.module.css'

export const Card = (props) => {
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [audio, setAudio] = useState(null)
    const [previewAudio, setPreviewAudio] = useState(null)
    const [card, setCard] = useState({
        picture: '',
        audio: '',
        studySet: '',
    })

    const handleChangeImage = async (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreviewImage(await uploadFile(file))
        }
    }

    const handleDeleteImage = () => {
        setImage(null)
        setPreviewImage(null)
    }

    const handleChangeAudio = (e) => {
        if (e.target.files[0]) {
            setAudio(e.target.files[0])
            setPreviewAudio(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleDeleteAudio = () => {
        setAudio(null)
        setPreviewAudio(null)
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
                            className={styles.file_upload}
                            onChange={handleChangeImage}
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
                            className={styles.file_upload}
                            onChange={handleChangeAudio}
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
            {(previewImage || previewAudio) && (
                <div className={`card-footer ${styles.card_footer} p-3`}>
                    <div className="row">
                        {previewImage && (
                            <div className="col-6 d-flex align-items-center">
                                <img
                                    src={previewImage}
                                    className={styles.image_upload}
                                    alt="user upload"
                                />
                                <button
                                    type="button"
                                    className={`btn btn-danger ms-5 p-0 rounded-circle ${styles.btn_del}`}
                                    onClick={handleDeleteImage}
                                >
                                    <DeleteIcon size="1.25rem" />
                                </button>
                            </div>
                        )}
                        {previewAudio && (
                            <div className="col-6 d-flex align-items-center ">
                                <audio controls src={previewAudio}></audio>
                                <button
                                    type="button"
                                    className={`btn btn-danger ms-5 p-0 rounded-circle ${styles.btn_del}`}
                                    onClick={handleDeleteAudio}
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
