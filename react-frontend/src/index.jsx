import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'

import ListEmployeeComponent from './components/ListEmployee'
import CreateEmployeeComponent from './components/CreateEmployee'
import ViewEmployeeComponent from './components/ViewEmployee'
import RegisterComponent from './components/Auth/RegisterComponent'
import VideoChatContainer from './components/Chat/VideoChatContainer'
import ChatContainer from './components/Chat/ChatContainer'
import StorageContainer from './components/FileManagement/StorageContainer'
import TestJWT from './components/Chat/TestJWT'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login/Login'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './index.css'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route
                            path="register"
                            element={<RegisterComponent />}
                        />
                        <Route
                            path="employees"
                            element={<ListEmployeeComponent />}
                        />
                        <Route
                            path="add-employee/:id"
                            element={<CreateEmployeeComponent />}
                        />
                        <Route
                            path="view-employee/:id"
                            element={<ViewEmployeeComponent />}
                        />
                        <Route
                            path="videochat"
                            element={<VideoChatContainer />}
                        />
                        <Route
                            path="videochat/:call"
                            element={<VideoChatContainer />}
                        />
                        <Route
                            path="chat"
                            element={<ChatContainer />}
                        />
                        <Route
                            path="file"
                            element={<StorageContainer />}
                        />
                        <Route
                            path="test"
                            element={<TestJWT />}
                        />
                    </Route>

                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
