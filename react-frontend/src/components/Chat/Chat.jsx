import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import jwt_decode from 'jwt-decode'
import {
    getDatabase,
    ref,
    child,
    push,
    update,
    onChildAdded,
    remove,
    onChildRemoved,
} from 'firebase/database'

import ChatService from '../../services/ChatService'

import './chat.css'
import { CloseIcon, EditSquareSolidIcon } from '../icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
// import { AES, enc } from 'crypto-js';

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
var myUsername

const sendMessage = (event) => {
    event.preventDefault()
    // get message
    var message = document.getElementById('message').value
    var receiverUsername = document.getElementById('receiver').value
    document.getElementById('message').value = ''
    // console.log(message);

    // save in database
    // A post entry.
    const postData = {
        sender: myUsername,
        receiver: receiverUsername,
        message: message,
    }

    // Get a key for a new Post.
    const newPostKey = push(child(ref(database), 'messages')).key

    const updates = {}
    updates['/messages/' + newPostKey] = postData
    update(ref(database), updates)
}

const Chat = () => {
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const [messages, setMessages] = useState([])
    const [usernames, setUsernames] = useState([])
    const [receiverUsername, setReceiverUsername] = useState(null)

    useEffect(() => {
        // This code will run only once after initial render
        // Set the value after the initial render here
        // myUsername = prompt("Enter your name");
        let string = localStorage.getItem('userToken')
        if (string == null) {
            // TODO navigation

            navigate('/login')
        } else {
            let decode = jwt_decode(string)
            myUsername = decode.sub
            fetchData()
        }

        async function fetchData() {
            const response = await ChatService.findAllName(myUsername)
            setUsernames(response.data)
        }

        // console.log(usernames);

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

    const tooltip = <Tooltip>New message</Tooltip>

    // console.log(receiverUsername)

    const deleteMessage = (messageId) => {
        // console.log(self);
        // var messageId = self.getAttribute("data-id");

        const rootRef = ref(database, 'messages/')
        const messageRef = child(rootRef, messageId) // Retrieve the Reference object for the message
        remove(messageRef) // Remove the message from the database
        // rootRef.child(messageId).remove();
    }

    const choseUser = () => {
        const newReceiver = document.getElementById('receiver').value
        setReceiverUsername(newReceiver)
    }
    // const key = "6A576E5A7234753778217A25432A462D4A614E645267556B5870327335763879"; //256-bit && hex
    // TODO when done add to backend all of key
    function openVideoChat() {
        const myParameter = document.getElementById('receiver').value
        // const url = 'http://localhost:3000/videochat?param=' + AES.encrypt(myParameter, key).toString();
        const url = 'http://localhost:3000/video-chat?param=' + myParameter
        // Try to get a reference to the existing video chat window
        var myWindow = window.open('', 'myWindow')

        // Check if the window is already open
        if (myWindow.location.href === 'about:blank') {
            // If the window is not yet navigated to a page, navigate to the desired page
            myWindow.location.href = url
        } else {
            // If the window is already open and navigated to a page, focus it
            myWindow.focus()
        }
    }

    return (
        <div className="d-flex">
            {show && (
                <div className="chat_container">
                    <div className="chat_header">
                        <div className="d-flex justify-content-between">
                            <div className="chat-heading">New message</div>
                            <button
                                className="chat_closeBtn"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="chat_searchContainer d-flex align-items-center">
                            <div>To:</div>
                            <input type="text" className="chat_search" />
                        </div>
                    </div>
                    <select name="receiver" id="receiver" onChange={choseUser}>
                        {usernames.map((username) => (
                            <option key={username} value={username}>
                                {username}
                            </option>
                        ))}
                    </select>

                    <button className="btn btn-success" onClick={openVideoChat}>
                        {' '}
                        Call
                    </button>
                    {messages
                        .filter(
                            (message) =>
                                ((message.sender === myUsername &&
                                    message.receiver === receiverUsername) ||
                                    (message.sender === receiverUsername &&
                                        message.receiver === myUsername)) &&
                                message.video_call === true
                        )
                        .map((message) => (
                            <a href={'video-chat/' + message.message}>Answer</a>
                        ))}
                    <form onSubmit={sendMessage}>
                        <input
                            id="message"
                            placeholder="Enter message"
                            autoComplete="off"
                        />
                        <input type="submit" />
                    </form>

                    {/* <ul id="messages"></ul> */}
                    {/* Render a list of messages */}
                    <ul id="messages">
                        {messages
                            .filter(
                                (message) =>
                                    ((message.sender === myUsername &&
                                        message.receiver ===
                                            receiverUsername) ||
                                        (message.sender === receiverUsername &&
                                            message.receiver === myUsername)) &&
                                    message.video_call !== true
                            )
                            .map((message) => (
                                <li key={message.key}>
                                    {message.sender === myUsername && (
                                        <button
                                            data-id={message.key}
                                            onClick={() =>
                                                deleteMessage(message.key)
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}

                                    {message.video_call ? (
                                        <a
                                            href={
                                                'videochat/' + message.message
                                            }
                                        >
                                            Call
                                        </a>
                                    ) : (
                                        <span>
                                            {message.sender}: {message.message}
                                        </span>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
            <OverlayTrigger placement="left" overlay={tooltip}>
                <button
                    className="chat_btn"
                    onClick={() => {
                        setShow(!show)
                    }}
                >
                    <EditSquareSolidIcon size="20px" />
                </button>
            </OverlayTrigger>
        </div>
    )
}

export default Chat
