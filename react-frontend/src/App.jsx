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
import CreateVocab from './pages/vocab/CreateVocab'
import MainClass from './pages/MainClass'
import Landing from './pages/Landing'
import AccountLayout from './pages/settings/SettingsLayout/SettingsLayout'
import Profile from './pages/settings/Profile/Profile'
import LibraryLayout from './pages/library/LibraryLayout'
import StudySetList from './pages/library/StudySetList/StudySetList'
import ProtectedRoute from './pages/protectedRoute/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UpdateClassroom from './pages/UpdateClassroom'
import ChangePassword from './pages/settings/ChangePassword'
import NotFound from './pages/notFound/NotFound'
import Notifications from './pages/settings/Notifications'
import Term from './components/footer/Term'
import Privacy from './components/footer/Privacy'
import JoinClass from './pages/JoinClass'
import ClassList from './pages/library/ClassList/ClassList'
import HelpCenter from './pages/HelpCenter'
import SendFeedback from './pages/SendFeedback'
import Language from './pages/settings/Language'
import DeleteAccount from './pages/settings/DeleteAccount'
import AccountDeleted from './pages/AccountDeleted/AccountDeleted'
import Translate from './pages/Translate'
import Dictionary from './pages/Dictionary'
import PostInClass from './pages/PostInClass'

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
                            <Route
                                path="change-language"
                                element={<Language />}
                            />
                            <Route
                                path="delete-account"
                                element={<DeleteAccount />}
                            />
                        </Route>
                        <Route element={<LibraryLayout />}>
                            <Route path="sets" element={<StudySetList />} />
                            <Route path="classes" element={<ClassList />} />
                        </Route>
                        <Route
                            path="create-vocab"
                            element={<CreateVocab />}
                        />
                        <Route
                            path="edit-vocab/:id"
                            element={<CreateVocab />}
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
                        <Route path="gpt" element={<GPTContainer />} />
                        <Route path="voice" element={<SpeechToText />} />
                        <Route path="draw" element={<Draw />} />
                        <Route path="to-speech" element={<TextToSpeech />} />
                    </Route>
                    <Route path="term" element={<Term />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="/joinclass" element={<JoinClass />} />
                    <Route path="/mainclass/:id" element={<MainClass />} />
                    <Route
                        path="account-deleted"
                        element={<AccountDeleted />}
                    />
                    <Route path="/helpcenter" element={<HelpCenter />} />
                    <Route
                        path="/helpcenter/sendfeedback"
                        element={<SendFeedback />}
                    />
                    <Route path="/translate" element={<Translate />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/dictionary" element={<Dictionary />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/flashcard" element={<Flashcard />} />
                <Route path="/updateclass" element={<UpdateClassroom />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
