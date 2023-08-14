import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'

import { logout as authLogout } from './features/auth/authSlice'
import { logout as userLogout } from './features/user/userSlice'
import AuthService from './services/AuthService'

import AuthVerify from './components/common/authVerify'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Chat from './pages/Chat'
import Layout from './components/layouts/Layout'
import Flashcard from './pages/studySet/flashcard/Flashcard'
import ClassLayout from './pages/class/classLayout/ClassLayout'
import Landing from './pages/landing/Landing'
import AccountLayout from './pages/settings/SettingsLayout/SettingsLayout'
import Profile from './pages/settings/Profile/Profile'
import LibraryLayout from './pages/library/LibraryLayout'
import StudySetList from './pages/library/StudySetList'
import ProtectedRoute from './pages/protectedRoute/ProtectedRoute'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import ChangePassword from './pages/settings/ChangePassword'
import NotFound from './pages/notFound/NotFound'
import Notifications from './pages/settings/notification/Notifications'
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
import ManageUser from './pages/admin/manage/ManageUser'
import BanUser from './pages/admin/BanUser'
import UnBanUser from './pages/admin/UnBanUser'
import AdminDashboard from './pages/admin/AdminDashboard'
import SidebarforAdmin from './pages/admin/SidebarforAdmin'
import ViewDetailsUser from './pages/admin/view/ViewDetailsUser'
import ManageClass from './pages/admin/manage/ManageClass'
import ViewDetailClass from './pages/admin/view/ViewDetailClass'
import ManageFeedback from './pages/admin/manage/ManageFeedback'
import ViewDetailFeedback from './pages/admin/view/ViewDetailFeedback'
import ManageStudyset from './pages/admin/manage/ManageStudyset'
import ManageAssignment from './pages/admin/manage/ManageAssignment'
import ViewDetailAssignment from './pages/admin/view/ViewDetailAssignment'
import ViewDetailTestForAdmin from './pages/admin/view/ViewDetailTestForAdmin'
import ManagePost from './pages/admin/manage/ManagePost'
import ViewDetailPost from './pages/admin/view/ViewDetailPost'
import ManageComment from './pages/admin/manage/ManageComment'
import ViewDetailComment from './pages/admin/view/ViewDetailComment'
import CreateSet from './pages/studySet/create/CreateSet'
import VocabDict from './pages/dictionary/VocabDict'
import GrammarDict from './pages/dictionary/GrammarDict'
import KanjiDict from './pages/dictionary/KanjiDict'
import ViewKanjiDetail from './pages/studySet/view/ViewKanjiDetail'
import ViewVocabularyDetail from './pages/studySet/view/ViewVocabularyDetail'
import ViewStudySet from './pages/studySet/view/ViewStudySet'
import TestList from './pages/class/test/TestList'
import Stream from './pages/class/Stream'
import CreateTest from './pages/class/test/CreateTest'
import CreateAssignment from './pages/class/assignment/CreateAssignment'
import DoQuiz from './pages/studySet/quiz/DoQuiz'
import AssignmentList from './pages/class/assignment/AssignmentList'
import People from './pages/class/People'
import ViewDetailStudyset from './pages/admin/view/ViewDetailStudyset'
import ManageTest from './pages/admin/manage/ManageTest'
import ManageSubmission from './pages/admin/manage/ManageSubmission'
import ViewDetailSubmission from './pages/admin/view/ViewDetailSubmission'
import RegisterAdmin from './pages/admin/RegiserAdmin'
import Achievements from './pages/library/Achievements'
import Statistics from './pages/library/Statistics'
import ClassStatistics from './pages/class/ClassStatistics'
import Learn from './pages/studySet/learn/Learn'
import ViewAssignment from './pages/class/assignment/ViewAssignment'
import Instructions from './pages/class/assignment/Instructions'
import Submissions from './pages/class/assignment/Submissions'
import VideoCall from './components/chat/VideoCall'
import UseAccount from './pages/help/UseAccount'
import ViewTest from './pages/class/test/ViewTest'
import TestDetails from './pages/class/test/TestDetails'
import DoTest from './pages/class/test/DoTest'
import SettingForAdmin from './pages/admin/SettingForAdmin'
import DictionaryForAdmin from './pages/admin/dictionaryforadmin/DictionaryLayoutForAdmin'
import VocabDictForAdmin from './pages/admin/dictionaryforadmin/VocabDictForAdmin'
import KanjiDictForAdmin from './pages/admin/dictionaryforadmin/KanjiDictForAdmin'
import GrammarDictForAdmin from './pages/admin/dictionaryforadmin/GrammarDictForAdmin'
import Results from './pages/class/test/Results'

const App = () => {
    const { userToken } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // ignore error
    useEffect(() => {
        window.addEventListener('error', (e) => {
            console.log(e)
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            )
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            )
            if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none')
            }
            if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none')
            }
        })
    }, [])

    const logOut = useCallback(async () => {
        try {
            dispatch(authLogout())
            dispatch(userLogout())
            await AuthService.logout()
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }, [dispatch])

    return (
        <BrowserRouter>
            <Routes>
                {/* Header + footer */}
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
                            <Route
                                path="achievements"
                                element={<Achievements />}
                            />
                            <Route path="sets" element={<StudySetList />} />
                            <Route path="classes" element={<ClassList />} />
                            <Route path="statistics" element={<Statistics />} />
                        </Route>
                        {/* Study Set */}
                        <Route path="create-set" element={<CreateSet />} />
                        <Route path="edit-set/:id" element={<CreateSet />} />
                        {/* Class */}
                        <Route path="class/:id" element={<ClassLayout />}>
                            <Route index element={<Stream />} />
                            <Route
                                path="assignments"
                                element={<AssignmentList />}
                            />
                            <Route
                                path="create-assignment"
                                element={<CreateAssignment />}
                            />
                            <Route
                                path="edit-assignment/:assign_id"
                                element={<CreateAssignment />}
                            />
                            <Route path="tests" element={<TestList />} />
                            <Route
                                path="create-test"
                                element={<CreateTest />}
                            />
                            <Route
                                path="edit-test/:test_id"
                                element={<CreateTest />}
                            />
                            <Route path="people" element={<People />} />
                            <Route
                                path="statistics"
                                element={<ClassStatistics />}
                            />
                        </Route>
                        {/* Assignment */}
                        <Route
                            path="class/:id/assignment/:assign_id"
                            element={<ViewAssignment />}
                        >
                            <Route path="details" element={<Instructions />} />
                            <Route
                                path="submissions"
                                element={<Submissions />}
                            />
                        </Route>
                        {/* Test */}
                        <Route
                            path="class/:id/test/:test_id"
                            element={<ViewTest />}
                        >
                            <Route path="details" element={<TestDetails />} />
                            <Route path="results" element={<Results />} />
                        </Route>
                        {/* Feedback */}
                        <Route
                            path="help-center/send-feedback"
                            element={<SendFeedback />}
                        />
                    </Route>
                    {/* Study set */}
                    <Route path="set/:id" element={<ViewStudySet />} />
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
                    <Route path="/useaccount" element={<UseAccount />} />
                </Route>
                {/* No header + footer */}
                {/* Auth */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                {/* Access deny */}
                <Route element={<ProtectedRoute />}>
                    {/* study set */}
                    <Route path="flashcards/:id" element={<Flashcard />} />
                    <Route path="quiz/:id" element={<DoQuiz />} />
                    <Route path="learn/:id" element={<Learn />} />
                    <Route path="video-call" element={<VideoCall />} />
                    <Route path="video-call/:call" element={<VideoCall />} />
                    {/* test */}
                    <Route path="do-test/:id" element={<DoTest />} />
                    {/* admin */}
                    <Route path="/banuser" element={<BanUser />} />
                    <Route path="/unbanuser" element={<UnBanUser />} />
                    <Route path="/manageusers" element={<ManageUser />} />
                    <Route path="/sidebar" element={<SidebarforAdmin />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route
                        path="/viewdetailuser/:username"
                        element={<ViewDetailsUser />}
                    />
                    <Route path="/manageclass" element={<ManageClass />} />
                    <Route
                        path="/viewdetailclass/:id"
                        element={<ViewDetailClass />}
                    />
                    <Route
                        path="/managefeedback"
                        element={<ManageFeedback />}
                    />
                    <Route
                        path="/viewdetailfb/:id"
                        element={<ViewDetailFeedback />}
                    />
                    <Route
                        path="/managestudyset"
                        element={<ManageStudyset />}
                    />
                    <Route
                        path="/viewdetailset/:id"
                        element={<ViewDetailStudyset />}
                    />
                    <Route
                        path="/manageassignment"
                        element={<ManageAssignment />}
                    />
                    <Route
                        path="/viewdetailassign/:id"
                        element={<ViewDetailAssignment />}
                    />
                    <Route path="/managetest" element={<ManageTest />} />
                    <Route
                        path="/viewdetailtest/:id"
                        element={<ViewDetailTestForAdmin />}
                    />
                    <Route path="/managepost" element={<ManagePost />} />
                    <Route
                        path="/viewdetailpost/:id"
                        element={<ViewDetailPost />}
                    />
                    <Route path="/managecomment" element={<ManageComment />} />
                    <Route
                        path="/viewdetailcomment/:id"
                        element={<ViewDetailComment />}
                    />
                    <Route
                        path="/managesubmission"
                        element={<ManageSubmission />}
                    />
                    <Route
                        path="/viewdetailsubmission/:id"
                        element={<ViewDetailSubmission />}
                    />
                    <Route path="/chatbox" element={<Chat />} />
                    <Route
                        path="/viewdetailkanji"
                        element={<ViewKanjiDetail />}
                    />
                    <Route
                        path="/viewdetailvocab"
                        element={<ViewVocabularyDetail />}
                    />
                    <Route path="/registeradmin" element={<RegisterAdmin />} />
                    <Route
                        path="/settingsadmin"
                        element={<SettingForAdmin />}
                    />
                    <Route element={<DictionaryForAdmin />}>
                        <Route
                            path="/vocabforadmin"
                            element={<VocabDictForAdmin />}
                        />
                        <Route
                            path="/kanjiforadmin"
                            element={<KanjiDictForAdmin />}
                        />
                        <Route
                            path="/grammarforadmin"
                            element={<GrammarDictForAdmin />}
                        />
                    </Route>
                </Route>
            </Routes>
            <AuthVerify logOut={logOut} />
        </BrowserRouter>
    )
}
export default App
