import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import './trash.css'

const Trash = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    return (
        <div className="flex-grow-1">
            <div className="trash_header">
                <h3>Trash</h3>
                <div className="mainClass_navbar mt-4">
                    <ul className="nav mainClass-navLink">
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
            </div>
            <div className="library-layout p-2">
                <Outlet />
            </div>
        </div>
    )
}
export default Trash
