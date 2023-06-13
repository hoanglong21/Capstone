import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'

import Register from './pages/Register'
import VideoChatContainer from './components/Chat/VideoChatContainer'
import ChatContainer from './components/Chat/ChatContainer'
import StorageContainer from './components/FileManagement/StorageContainer'
import SpeechToText from './components/InputModel/SpeechToText'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import CreateStudySet from './pages/CreateStudySet'
import Draw from './components/InputModel/Draw'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './index.css'
import GPTContainer from './components/Chat/GPTContainer'
import TextToSpeech from './components/InputModel/TextToSpeech'
import Flashcard from './pages/Flashcard'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route
                            path="study-set/add"
                            element={<CreateStudySet />}
                        />
                        <Route
                            path="video-chat"
                            element={<VideoChatContainer />}
                        />
                        <Route
                            path="video-chat/:call"
                            element={<VideoChatContainer />}
                        />
                        <Route path="chat" element={<ChatContainer />} />
                        <Route path="file" element={<StorageContainer />} />
                        <Route path="gpt" element={<GPTContainer />} />
                        <Route path="voice" element={<SpeechToText />} />
                        <Route path="draw" element={<Draw />} />
                        <Route path="tospeech" element={<TextToSpeech/>}/>
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/flashcard" element={<Flashcard />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
