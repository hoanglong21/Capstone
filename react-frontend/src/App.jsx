import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import VideoChatContainer from './components/Chat/VideoChatContainer'
import ChatContainer from './components/Chat/ChatContainer'
import Layout from './components/layouts/Layout'
import GPTContainer from './components/Chat/GPTContainer'
import Flashcard from './pages/studySet/flashcard/Flashcard'
import ClassLayout from './pages/class/classLayout/ClassLayout'
import Landing from './pages/Landing'
import AccountLayout from './pages/settings/SettingsLayout/SettingsLayout'
import Profile from './pages/settings/Profile/Profile'
import LibraryLayout from './pages/library/LibraryLayout'
import StudySetList from './pages/library/StudySetList'
import ProtectedRoute from './pages/protectedRoute/ProtectedRoute'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import ChangePassword from './pages/settings/ChangePassword'
import NotFound from './pages/notFound/NotFound'
import Notifications from './pages/settings/Notifications'
import Term from './components/footer/Term'
import Privacy from './components/footer/Privacy'
import ClassList from './pages/library/ClassList'
import HelpCenter from './pages/help/HelpCenter'
import SendFeedback from './pages/help/sendFeedback/SendFeedback'
import Language from './pages/settings/Language'
import DeleteAccount from './pages/settings/DeleteAccount'
import AccountDeleted from './pages/settings/AccountDeleted'
import Translate from './pages/translate/Translate'
import DictionaryLayout from './pages/dictionary/DictionaryLayout'
import Home from '../src/pages/home/Home'
import ClassesForHome from './pages/home/ClassesForHome'
import SetsForHome from './pages/home/SetsForHome'
import AuthLayout from './pages/auth/AuthLayout'
import OtherLayout from './components/layouts/OtherLayout/OtherLayout'
import UsersForHome from './pages/home/UsersForHome'
import AllForHome from './pages/home/AllForHome'
import ManageUser from './pages/admin/ManageUser'
import BanUser from './pages/admin/BanUser'
import UnBanUser from './pages/admin/UnBanUser'
import AdminDashboard from './pages/admin/AdminDashboard'
import SidebarforAdmin from './pages/admin/SidebarforAdmin'
import ViewDetailsUser from './pages/admin/ViewDetailsUser'
import ManageClass from './pages/admin/ManageClass'
import ViewDetailClass from './pages/admin/ViewDetailClass'
import ManageFeedback from './pages/admin/ManageFeedback'
import ViewDetailFeedback from './pages/admin/ViewDetailFeedback'
import CreateSet from './pages/studySet/create/CreateSet'
import Chat from './pages/Chat'
import VocabDict from './pages/dictionary/VocabDict'
import GrammarDict from './pages/dictionary/GrammarDict'
import KanjiDict from './pages/dictionary/KanjiDict'
import ViewKanjiDetail from './pages/studySet/view/ViewKanjiDetail'
import ViewGrammarDetail from './pages/studySet/view/ViewGrammarDetail'
import ViewVocabularyDetail from './pages/studySet/view/ViewVocabularyDetail'
import ViewSet from './pages/studySet/view/ViewSet'
import DoTest from './pages/class/test/DoTest'
import ManageTest from './pages/class/test/ManageTest'
import Stream from './pages/class/Stream'
import CreateTest from './pages/class/test/CreateTest'
import ViewDetailTest from './pages/class/test/ViewDetailTest'

const App = () => {
    const { userToken } = useSelector((state) => state.auth)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Home */}
                    <Route path="" element={userToken ? <Home /> : <Landing />}>
                        <Route index element={<AllForHome />} />
                        <Route path="sets" element={<SetsForHome />} />
                        <Route path="classes" element={<ClassesForHome />} />
                        <Route path="users" element={<UsersForHome />} />
                    </Route>
                    {/* Access deny */}
                    <Route element={<ProtectedRoute />}>
                        {/* Account settings */}
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
                        {/* Library */}
                        <Route path="library" element={<LibraryLayout />}>
                            <Route path="sets" element={<StudySetList />} />
                            <Route path="classes" element={<ClassList />} />
                        </Route>
                        {/* Study Set */}
                        <Route path="create-set" element={<CreateSet />} />
                        <Route path="edit-set/:id" element={<CreateSet />} />
                        {/* Class */}
                        <Route path="class/:id" element={<ClassLayout />}>
                            <Route index path="stream" element={<Stream />} />
                        </Route>
                        {/* Test */}
                        <Route path="/dotest" element={<DoTest />} />
                        <Route path="/managetest" element={<ManageTest />} />
                        <Route
                            path="/viewdetailtest"
                            element={<ViewDetailTest />}
                        />
                        <Route path="/createtest" element={<CreateTest />} />
                        {/* Feedback */}
                        <Route
                            path="help-center/send-feedback"
                            element={<SendFeedback />}
                        />
                        {/* Chat */}
                        <Route path="chat" element={<ChatContainer />} />
                        <Route path="gpt" element={<GPTContainer />} />
                        <Route
                            path="video-chat"
                            element={<VideoChatContainer />}
                        />
                        <Route
                            path="video-chat/:call"
                            element={<VideoChatContainer />}
                        />
                    </Route>
                    {/* Study set */}
                    <Route path="set/:id" element={<ViewSet />} />
                    {/* Translate */}
                    <Route path="translate" element={<Translate />} />
                    {/* Dictionary */}
                    <Route element={<DictionaryLayout />}>
                        <Route path="vocab" element={<VocabDict />} />
                        <Route path="kanji" element={<KanjiDict />} />
                        <Route path="grammar" element={<GrammarDict />} />
                    </Route>
                    {/* Password */}
                    <Route element={<OtherLayout />}>
                        <Route path="forgotten" element={<ForgotPassword />} />
                        <Route
                            path="account-deleted"
                            element={<AccountDeleted />}
                        />
                        <Route
                            path="reset-password"
                            element={<ResetPassword />}
                        />
                    </Route>
                    {/* Page not found */}
                    <Route path="*" element={<NotFound />} />
                    {/* Other */}
                    <Route path="term" element={<Term />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="help-center" element={<HelpCenter />} />
                    {/* Discovery */}
                    <Route path="discovery" element={<Home />}>
                        <Route index element={<AllForHome />} />
                        <Route path="sets" element={<SetsForHome />} />
                        <Route path="classes" element={<ClassesForHome />} />
                        <Route path="users" element={<UsersForHome />} />
                    </Route>
                </Route>
                {/* Auth */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                {/* Access deny */}
                <Route element={<ProtectedRoute />}>
                    <Route path="flashcards/:id" element={<Flashcard />} />
                </Route>

                <Route path="/banuser" element={<BanUser />} />
                <Route path="/unbanuser" element={<UnBanUser />} />
                <Route path="/manageusers" element={<ManageUser />} />
                <Route path="/sidebar" element={<SidebarforAdmin />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route
                    path="/manageusers/viewdetails"
                    element={<ViewDetailsUser />}
                />
                <Route path="/manageclass" element={<ManageClass />} />
                <Route
                    path="/manageclass/viewdetails"
                    element={<ViewDetailClass />}
                />
                <Route path="/managefeedback" element={<ManageFeedback />} />
                <Route
                    path="/managefeedback/viewdetailfb"
                    element={<ViewDetailFeedback />}
                />
                <Route path="/chatbox" element={<Chat />} />
                <Route path="/viewdetailkanji" element={<ViewKanjiDetail />} />
                <Route
                    path="/viewdetailgrammar"
                    element={<ViewGrammarDetail />}
                />
                <Route
                    path="/viewdetailvocab"
                    element={<ViewVocabularyDetail />}
                />
            </Routes>
        </BrowserRouter>
    )
}
export default App
