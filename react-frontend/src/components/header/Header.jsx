import './Header.css'

import logo from '../../assets/images/Quizlet-Logo.png'
import {
    Home as HomeIcon,
    MagnifyingGlass as SearchIcon,
    Language as TranslateIcon,
    BuildingLibrary as LibraryIcon,
    PlusCircle as AddIcon,
} from '../../assets/icons/icons'

const Header = () => {
    return (
        <header class="p-3 border-bottom">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a
                        href="/"
                        class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
                    >
                        <img
                            className="bi me-5"
                            src={logo}
                            alt="logo"
                            height="32"
                        />
                    </a>

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 fw-semibold">
                        <li>
                            <a href="#" class="nav-link px-2 active">
                                <HomeIcon className="mx-1" />
                                <span className="align-middle">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-2">
                                <SearchIcon className="mx-1" />
                                <span className="align-middle">Search</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-2">
                                <TranslateIcon className="mx-1" />
                                <span className="align-middle">Translate</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-2">
                                <LibraryIcon className="mx-1" />
                                <span className="align-middle">
                                    Your Library
                                </span>
                            </a>
                        </li>
                    </ul>

                    <div class="text-end">
                        <AddIcon className="icon-primary me-3" size="3rem" />
                        <button type="button" class="btn btn-light me-2">
                            Login
                        </button>
                        <button type="button" class="btn btn-warning">
                            Sign-up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header
