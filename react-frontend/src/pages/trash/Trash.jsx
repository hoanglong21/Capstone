import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import './trash.css'

const Trash = () => {
    return (
        <div className="flex-grow-1">
            <div className="trash_container">
                <h3>Trash</h3>
                <p>Items in Trash will be permanently deleted after 30 days.</p>
                <div className="mainClass_navbar mt-3">
                    <ul className="nav">
                        <li>
                            <NavLink
                                to="sets"
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">Study sets</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="classes"
                                end
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">Classes</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
export default Trash
