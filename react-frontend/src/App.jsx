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
import CreateStudySet from './pages/studySet/CreateStudySet'
import MainClass from './pages/MainClass'
import Landing from './pages/Landing'
import AccountLayout from './components/layouts/User/UserLayout'
import Profile from './pages/user/Profile/Profile'
import LibraryLayout from './components/layouts/LibraryLayout'
import StudySetList from './pages/library/StudySetList'
import NoClass from './pages/NoClass'
import ProtectedRoute from './components/layouts/ProtectedRoute/ProtectedRoute'
import StudySet from './pages/studySet/StudySet'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UpdateClassroom from './pages/UpdateClassroom'
import ChangePassword from './pages/user/ChangePassword'
import NotFound from './pages/notFound/NotFound'
import Notifications from './pages/user/Notifications'
import Term from './components/footer/Term'

const App = () => {
    const { userToken } = useSelector((state) => state.auth)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={userToken ? <Home /> : <Landing />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="account" element={<AccountLayout />}>
                            <Route index element={<Profile />} />
                            <Route
                                path="notification"
                                element={<Notifications />}
                            />
                            <Route
                                path="change-password"
                                element={<ChangePassword />}
                            />
                        </Route>
                        <Route path="sets" element={<LibraryLayout />}>
                            <Route index element={<StudySetList />} />
                        </Route>
                        <Route
                            path="create-set/:id"
                            element={<CreateStudySet />}
                        />
                        <Route
                            path="edit-set/:id"
                            element={<CreateStudySet />}
                        />
                        <Route path="set/:id" element={<StudySet />} />
                        <Route
                            path="video-chat"
                            element={<VideoChatContainer />}
                        />
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
                    <Route path="*" element={<NotFound />} />
                    <Route path="term" element={<Term />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/flashcard" element={<Flashcard />} />
                <Route path="/createclass" element={<CreateClassroom />} />
                <Route path="/updateclass" element={<UpdateClassroom />} />
                <Route path="/mainclass" element={<MainClass />} />
                <Route path="/noclass" element={<NoClass />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
