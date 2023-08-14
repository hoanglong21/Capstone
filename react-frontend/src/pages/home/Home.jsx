import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import banner from '../../assets/images/home.jpg'
import '../../assets/styles/Home.css'

function Home() {
    const { userToken } = useSelector((state) => state.auth)

    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [searchKey, setSearchKey] = useState(search)

    const [path, setPath] = useState('')

    useEffect(() => {
        userToken ? setPath('/') : setPath('/discovery/')
    }, [userToken])

    return (
        <div>
            <img className="img_left" src={banner} alt="" />
            <div className="container mt-4 mb-5">
                <div className="dictionary_header">
                    <div className="container mx-auto py-8">
                        <div className="mobile justify-center mt-4">
                            <div className="form123 text-center form-inline">
                                <form className="form-home">
                                    <input
                                        id="searchHomeInput"
                                        className="form-home-input form-control mr-sm-2"
                                        type="search"
                                        placeholder="Study set, Class, User"
                                        aria-label="Search"
                                        value={searchKey || ''}
                                        onChange={(event) =>
                                            setSearchKey(event.target.value)
                                        }
                                    />
                                    <button
                                        id="searchHomeBtn"
                                        className="btn btn-primary my-2 my-sm-0"
                                        style={{
                                            marginLeft: '1rem',
                                            minWidth: '5rem',
                                            minHeight: '40px',
                                        }}
                                        type="submit"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setSearchParams({
                                                search: searchKey,
                                            })
                                        }}
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        <div className="border-bottom bg-white p-2 pb-0">
                            <ul className="nav-home nav flex-grow-1 fw-semibold">
                                <li>
                                    <NavLink
                                        to={{
                                            pathname: path,
                                            search: `?${searchParams.toString()}`,
                                        }}
                                        className={
                                            'nav-link sub-nav-link px-3 me-3 ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            All
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={{
                                            pathname: path + 'sets',
                                            search: `?${searchParams.toString()}`,
                                        }}
                                        className={
                                            'nav-link sub-nav-link px-3 me-3 ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Study Sets
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={{
                                            pathname: path + 'classes',
                                            search: `?${searchParams.toString()}`,
                                        }}
                                        className={
                                            'nav-link px-3 sub-nav-link me-3 ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Classes
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={{
                                            pathname: path + 'users',
                                            search: `?${searchParams.toString()}`,
                                        }}
                                        className={
                                            'nav-link px-3 sub-nav-link me-3 ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Users
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
