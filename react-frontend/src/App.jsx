import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Register from './pages/Register'
import Login from './pages/Login'
import VideoChatContainer from './components/Chat/VideoChatContainer'
import ChatContainer from './components/Chat/ChatContainer'
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
import CreateStudySet from './pages/studySet/CreateStudySet'
import MainClass from './pages/MainClass'
import Landing from './pages/Landing'
import AccountLayout from './components/layouts/Account/AccountLayout'
import Profile from './pages/account/Profile'
import LibraryLayout from './components/layouts/LibraryLayout'
import StudySetList from './pages/studySet/StudySetList'

const App = () => {
    const isLoggedIn = useSelector((state) => state.auth.token)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={isLoggedIn ? <Home /> : <Landing />}
                    />
                    <Route path="account" element={<AccountLayout />}>
                        <Route index element={<Profile />} />
                    </Route>
                    <Route path="sets" element={<LibraryLayout />}>
                        <Route index element={<StudySetList />} />
                    </Route>
                    <Route path="create-set/:id" element={<CreateStudySet />} />
                    <Route path="video-chat" element={<VideoChatContainer />} />
                    <Route
                        path="video-chat/:call"
                        element={<VideoChatContainer />}
                    />
                    <Route path="chat" element={<ChatContainer />} />
                    <Route path="gpt" element={<GPTContainer />} />
                    <Route path="voice" element={<SpeechToText />} />
                    <Route path="draw" element={<Draw />} />
                    <Route path="to-speech" element={<TextToSpeech />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/flashcard" element={<Flashcard />} />
                <Route path="/createclass" element={<CreateClassroom />} />
                <Route path="/joinclass" element={<JoinClass />} />
                <Route path="/insideclass" element={<InsideClassroom />} />
                <Route path="/mainclass" element={<MainClass />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App