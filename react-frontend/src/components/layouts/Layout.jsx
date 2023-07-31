import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app'
import {
    getDatabase,
    ref,
    onChildAdded,
    onChildRemoved,
    child,
    remove,
} from 'firebase/database'

import Header from '../header/Header'
import Footer from '../footer/Footer'
import ChatContainer from '../chat/Chat'

import defaultAvatar from '../../assets/images/default_avatar.png'
import { CloseIcon, VideoCallSolidIcon } from '../icons'
import '../chat/chat.css'

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

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebaseApp)

export default function Layout() {
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getData = ref(database, 'messages/')

        onChildAdded(getData, (data) => {
            let temp = { ...data.val(), key: data.key }
            setMessages((messages) => [...messages, temp])
        })

        onChildRemoved(getData, (data) => {
            const deletedMessage = data.val()
            console.log(
                `The message with ID ${data.key} was removed:`,
                deletedMessage
            )
            setMessages((messages) =>
                messages.filter((message) => message.key !== data.key)
            )
        })
    }, [])

    const deleteMessage = (messageId) => {
        // console.log(self);
        // var messageId = self.getAttribute("data-id");

        const rootRef = ref(database, 'messages/')
        const messageRef = child(rootRef, messageId) // Retrieve the Reference object for the message
        remove(messageRef) // Remove the message from the database
        // rootRef.child(messageId).remove();
    }

    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <div className="flex-grow-1">
                <Outlet />
                {userToken && <ChatContainer />}
            </div>
            <Footer />
            {/* video call modal */}
            {messages
                ?.filter(
                    (message) =>
                        message.video_call === true &&
                        message.receiver === userInfo.username
                )
                .map((message, index) => (
                    <div className="chat_callModal" key={message.message}>
                        <div className="chat_callModalContent">
                            <button
                                className="chat_btn chat_callModalClose"
                                onClick={() => {
                                    deleteMessage(message.key)
                                }}
                            >
                                <CloseIcon />
                            </button>
                            <div className="d-flex flex-column align-items-center h-100">
                                <img
                                    src={message.senderAvatar || defaultAvatar}
                                />
                                <div className="flex-grow-1">
                                    <div className="chat_callModalHeading my-1">
                                        {message.sender} is calling you
                                    </div>
                                    <div className="chat_callModalSpan mb-4">
                                        The call will start as soon as you
                                        accept
                                    </div>
                                </div>

                                <div>
                                    <button
                                        className="chat_callModalBtn chat_callModalBtn--decline me-3"
                                        onClick={() => {
                                            deleteMessage(message.key)
                                        }}
                                    >
                                        <CloseIcon strokeWidth="2" />
                                    </button>
                                    <button
                                        className="chat_callModalBtn chat_callModalBtn--accept"
                                        onClick={() => {
                                            navigate(
                                                '/video-call/' + message.message
                                            )
                                        }}
                                    >
                                        <VideoCallSolidIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}
