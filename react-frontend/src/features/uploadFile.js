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

export const uploadFile = (file) => {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg',
    }

    const storageRef = ref(storage, 'images/' + file.name)

    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

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
    return getDownloadURL(uploadTask.snapshot.ref)
}
