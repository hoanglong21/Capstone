import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'

import ListEmployeeComponent from './components/ListEmployee'
import CreateEmployeeComponent from './components/CreateEmployee'
import ViewEmployeeComponent from './components/ViewEmployee'
import Register from './pages/Register/Register'
import VideoChatContainer from './components/Chat/VideoChatContainer'
import ChatContainer from './components/Chat/ChatContainer'
import StorageContainer from './components/FileManagement/StorageContainer'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login/Login'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './index.css'
import GPTContainer from './components/Chat/GPTContainer'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />

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
                        <Route path="chat" element={<ChatContainer />} />
                        <Route path="file" element={<StorageContainer />} />
                        <Route path="gpt" element={<GPTContainer />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
