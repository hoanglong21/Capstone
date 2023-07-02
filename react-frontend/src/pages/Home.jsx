import React from 'react'
import { NavLink} from 'react-router-dom'

function Home() {
    return (
        <>
            <div className="dictionary_header bg-light">
      <div className="container mx-auto py-8">
        <div className="justify-center mt-4">
          <div className="text-center form-inline">
            <form className="form-inline w-50" style={{ display: "inline-flex" }}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Study set, Class"
                aria-label="Search"
              />
              <button
                className="btn btn-primary my-2 my-sm-0"
                type="submit"
                style={{ marginLeft: "1rem" }}
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
                            to="/set"
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Study Sets</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/class"
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Group Class</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="container mx-auto p-4 max-w-2xl">
      </div>
        </div>
    </div>
        </>
    )
}

export default Home
