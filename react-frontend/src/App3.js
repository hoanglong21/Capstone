import './App.css'
import ListEmployee from './components/Employee/ListEmployeeComponent'
import Header from './components/Header'
import Footer from './components/Footer'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateEmployee from './components/Employee/CreateEmployeeComponent'
import ViewEmployee from './components/Employee/ViewEmployeeComponent'

function App() {
    return (
        <div>
            <Router>
                <Header />

                <div className="container">
                    <Routes>
                        <Route
                            path="/"
                            exact
                            element={<ListEmployee />}
                        ></Route>
                        <Route
                            path="/employees"
                            element={<ListEmployee />}
                        ></Route>
                        <Route
                            path="/add-employee/:id"
                            element={<CreateEmployee />}
                        ></Route>
                        <Route
                            path="/view-employee/:id"
                            element={<ViewEmployee />}
                        ></Route>
                    </Routes>
                </div>

                <Footer />
            </Router>
        </div>
    )
}

export default App
