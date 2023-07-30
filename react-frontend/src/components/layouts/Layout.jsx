import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from '../header/Header'
import Footer from '../footer/Footer'
import ChatContainer from '../chat/Chat'

export default function Layout() {
    const { userToken } = useSelector((state) => state.auth)

    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <div className="flex-grow-1">
                <Outlet />
                {userToken && <ChatContainer />}
            </div>
            <Footer />
        </div>
    )
}
