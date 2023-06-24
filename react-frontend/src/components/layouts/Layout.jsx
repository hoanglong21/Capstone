import { Outlet } from 'react-router-dom'

import Header from '../header/Header'
import Footer from '../footer/Footer'

export default function Layout() {
    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <div className="flex-grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
