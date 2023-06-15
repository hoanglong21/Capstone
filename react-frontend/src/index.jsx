import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'

import Register from './pages/Register'
import Login from './pages/Login'
import VideoChatContainer from './components/Chat/VideoChatContainer'
import ChatContainer from './components/Chat/ChatContainer'
import StorageContainer from './features/StorageContainer'
import SpeechToText from './components/InputModel/SpeechToText'
import Layout from './components/layouts/Layout'
import Home from './pages/Home'
import Draw from './components/InputModel/Draw'
import GPTContainer from './components/Chat/GPTContainer'
import TextToSpeech from './components/InputModel/TextToSpeech'
import Flashcard from './pages/Flashcard'
import CreateClassroom from './pages/CreateClassroom'
import JoinClass from './pages/JoinClass'
import InsideClassroom from './pages/InsideClassroom'
import StudySetList from './pages/library/StudySetList'
import CreateStudySet from './pages/studySet/CreateStudySet'
import Library from './pages/library/Library'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './index.css'
import MainClass from './pages/MainClass'
import Landing from './pages/Landing'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Landing />} />
                        <Route path='home' element={<Home />} />
                        <Route path="library" element={<Library />}>
                            <Route path="sets" element={<StudySetList />} />
                        </Route>
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
                        <Route path="to-speech" element={<TextToSpeech />} />
                        <Route
                            path="createclass"
                            element={<CreateClassroom />}
                        />
                        <Route path="joinclass" element={<JoinClass />} />
                        <Route
                            path="insideclass"
                            element={<InsideClassroom />}
                        />
                        <Route path="flashcard" element={<Flashcard />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/flashcard" element={<Flashcard />} />
                    <Route path="/createclass" element={<CreateClassroom />} />
                    <Route path="/joinclass" element={<JoinClass />} />
                    <Route path="/insideclass" element={<InsideClassroom />} />
                    <Route path='/mainclass' element={<MainClass />} />

                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
