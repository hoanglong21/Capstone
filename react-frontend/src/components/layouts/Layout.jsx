import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from '../header/Header'
import Footer from '../footer/Footer'
import ChatContainer from '../Chat/Chat'

export default function Layout() {
    const { userInfo } = useSelector((state) => state.user)

    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <div className="flex-grow-1">
                <Outlet />
                {userInfo?.id && <ChatContainer />}
            </div>
            <Footer />
        </div>
    )
}
