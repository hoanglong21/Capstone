import { NavLink, Outlet } from 'react-router-dom'

const Library = () => {
    return (
        <div>
            <div className="border-bottom bg-white p-2 pb-0">
                <ul className="nav d-flex align-items-center flex-grow-1 mx-5 fw-semibold">
                    <li>
                        <NavLink
                            to="."
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Study sets</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="folders"
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Folders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="classes"
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Classes</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="mx-5 p-2">
                <Outlet />
            </div>
        </div>
    )
}
export default Library
