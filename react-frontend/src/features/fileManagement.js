import firebase from 'firebase/compat/app'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    listAll,
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

export const uploadFile = (file, folderName) => {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg',
    }

    const storageRef = ref(storage, 'files/' + folderName + '/' + file.name)

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
                default:
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

export const deleteFile = (fileName, folderName) => {
    // Create a reference to the file to delete
    const fileRef = ref(storage, `files/` + folderName + `${fileName}`)

    // Delete the file
    deleteObject(fileRef)
        .then(() => {
            console.log(`${fileName} has been deleted successfully.`)
        })
        .catch((error) => {
            console.error(`Error deleting ${fileName}: ${error}`)
        })
}

export const deleteFileByUrl = (url, folderName) => {
    // Get the file path from the URL
    const pathStartIndex = url.indexOf('/files' + folderName)
    const pathEndIndex = url.indexOf('?')
    const filePath = decodeURIComponent(
        url.substring(pathStartIndex + 1, pathEndIndex)
    )

    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath)

    // Delete the file
    deleteObject(fileRef)
        .then(() => {
            console.log(`${filePath} has been deleted successfully.`)
        })
        .catch((error) => {
            console.error(`Error deleting ${filePath}: ${error}`)
        })
}

export const getAll = async (folderName) => {
    const listRef = ref(storage, folderName)
    let data = []
    try {
        const res = await listAll(listRef)
        // for (let folderRef of res.prefixes) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        // }
        for (let itemRef of res.items) {
            const downloadURL = await getDownloadURL(itemRef)
            data.push(downloadURL)
        }
    } catch (error) {
        console.log(error)
    }
    return data
}
