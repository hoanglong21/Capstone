import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ListEmployeeComponent from './components/ListEmployee'
import IndexComponent from './components/Auth/IndexComponent'
import Header from './components/header/Header'
import FooterComponent from './components/Footer'
import CreateEmployeeComponent from './components/CreateEmployee'
import ViewEmployeeComponent from './components/ViewEmployee'
import LoginComponent from './components/Auth/LoginComponent'
import RegisterComponent from './components/Auth/RegisterComponent'

import './App.css'

function App() {
    return (
        <div className="App">
            <Router>
                <Header />

                <Routes>
                    <Route path="/" element={<IndexComponent />}></Route>
                    <Route path="/login" element={<LoginComponent />}></Route>
                    <Route
                        path="/register"
                        element={<RegisterComponent />}
                    ></Route>
                    <Route
                        path="/employees"
                        element={<ListEmployeeComponent />}
                    ></Route>

                    {/* step 1 */}
                    <Route
                        path="/add-employee/:id"
                        element={<CreateEmployeeComponent />}
                    ></Route>
                    {/* <Route path="/update-employee/:id" element = {<UpdateEmployeeComponent/>}></Route> */}

                    <Route
                        path="/view-employee/:id"
                        element={<ViewEmployeeComponent />}
                    ></Route>
                </Routes>

                {/* <FooterComponent /> */}
            </Router>
        </div>
    )
}

export default App
