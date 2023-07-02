import React from "react";
import { NavLink} from 'react-router-dom'

function Dictionary() {
  return (
    <div className="dictionary_header bg-light">
      <div className="container mx-auto py-8">
        <h4 className="text-3xl font-bold text-center text-black mt-3">
          Nihongo Level Up Dictionary
        </h4>
        <p className="text-center mt-1 mb-10 text-slate-300 text-lg">
          Find definition for word
        </p>

        <div className="justify-center mt-4">
          <div className="text-center form-inline">
            <form className="form-inline w-50" style={{ display: "inline-flex" }}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="日本, Japanese, Nhật Bản"
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
                            to="/kanji"
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Kanji</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/grammar"
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Grammar</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/vocab"
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Vocabulary</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="container mx-auto p-4 max-w-2xl">
        <div>
          <h6 className="text-2xl font-bold mt-4">Meaning & Definitions:</h6>
          <div>
            <div className="meaning">
              <li>ABC</li>
              <hr />
            </div>
          </div>
          <h6 className="text-2xl font-bold mt-4">Example:</h6>
          <div className="meaning">
              <li>Doremi</li>
              <hr />
            </div>
          <h6 className="text-2xl font-bold mt-4">Synonym:</h6>
          <div className="meaning">
              <li>ABC 도레미만큼 착했던 나</li>
              <hr />
            </div>
        </div>
      </div>
        </div>
    </div>
  );
}

export default Dictionary;
