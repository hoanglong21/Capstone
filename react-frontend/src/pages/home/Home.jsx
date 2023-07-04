import React from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import '../../assets/styles/Home.css'
import banner from '../../assets/images/home.jpg'

function Home() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    return (
        <>
            <img className="img_left" src={banner} alt="" />
            <div className="container mt-4 mb-5">
                <div className="dictionary_header bg-light">
                    <div className="container mx-auto py-8">
                        <div className="justify-center mt-4">
                            <div className="text-center form-inline">
                                <form
                                    className="form-inline w-50"
                                    style={{ display: 'inline-flex' }}
                                >
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Study set, Class"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(event) =>
                                            setSearchParams({
                                                search: event.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        className="btn btn-primary my-2 my-sm-0"
                                        type="submit"
                                        style={{ marginLeft: '1rem' }}
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        <div className="border-bottom bg-white p-2 pb-0">
                            <ul className="nav d-flex align-items-center flex-grow-1 mx-5 fw-semibold">
                                <li>
                                    <NavLink
                                        to={{
                                            pathname: '/',
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
                                            pathname: '/sets',
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
                                            pathname: '/classes',
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
                                            pathname: '/users',
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
        </>
    )
}

export default Home
