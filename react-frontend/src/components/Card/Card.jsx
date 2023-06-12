import { useState } from 'react'
import { DeleteIcon, ImageIcon, MicIcon } from '../../components/icons'
import TextEditor from '../../components/TextEditor'
import styles from '../../assets/styles/Card.module.css'

import firebase from 'firebase/compat/app'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyD9Fo5y8qhokjfJ_t4Gc0Gd4DXwDC_V2tM',
    authDomain: 'capstone-project-34253.firebaseapp.com',
    databaseURL:
        'https://capstone-project-34253-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'capstone-project-34253',
    storageBucket: 'capstone-project-34253.appspot.com',
    messagingSenderId: '342570414778',
    appId: '1:342570414778:web:6f43802265129593d88883',
    measurementId: 'G-0LG2E3HGPQ',
}

// Initialize Firebase
let firebaseApp
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
    firebaseApp = firebase.app()
}

const storage = getStorage(firebaseApp)

export const Card = (props) => {
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [audio, setAudio] = useState(null)
    const [previewAudio, setPreviewAudio] = useState(null)

    const handleChangeImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleChangeAudio = (e) => {
        if (e.target.files[0]) {
            setAudio(e.target.files[0])
            setPreviewAudio(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleUpload = () => {
        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg',
        }

        const storageRef = ref(storage, 'images/' + image.name)

        const uploadTask = uploadBytesResumable(storageRef, image, metadata)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    default:
                        break
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL)
                })
            }
        )
    }

    return (
        <div
            className={`card ${styles.card} mb-3`}
            key={props.index}
            id={props.index}
        >
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
                <div class={`card-footer ${styles.card_footer}`}>
                    {previewImage && (
                        <img
                            src={previewImage}
                            className={styles.image_upload}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
