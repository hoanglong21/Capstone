import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './dictionary.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function DictionaryLayout() {
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { userLanguage } = useSelector((state) => state.user)

    const [searchKey, setSearchKey] = useState(search)

    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userInfo?.role === 'ROLE_ADMIN') {
            navigate('/dashboard')
        }
    }, [userInfo])

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    return (
        <div className="container">
            {/* Search */}
            <div className="mx-auto py-8">
                <h4 className="text-3xl font-bold text-center text-black mt-3">
                    Nihongo Level Up {t('dictionary')}
                </h4>
                <p className="text-center mt-1 mb-10 text-slate-300 text-lg">
                    {t('find')}
                </p>

                <div className="justify-center mt-4">
                    <div className="text-center form-inline">
                        <form
                            className="form-dictionary form-inline"
                            style={{ display: 'inline-flex' }}
                        >
                            <input
                                id="searchDictInput"
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="日本, Japanese, Nhật Bản"
                                value={searchKey || ''}
                                onChange={(event) =>
                                    setSearchKey(event.target.value)
                                }
                            />
                            <button
                                id="searchDictBtn"
                                className="btn btn-primary my-2 my-sm-0"
                                style={{ marginLeft: '1rem' }}
                                onClick={(event) => {
                                    event.preventDefault()
                                    setSearchParams({
                                        search: searchKey,
                                    })
                                }}
                            >
                                {t('search')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Header */}
            <div className="border-bottom bg-white p-2 pb-0">
                <ul className="nav-dictionary nav flex-grow-1 fw-semibold">
                    <li>
                        <NavLink
                            to={{
                                pathname: 'vocab',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">
                                {t('vocabulary')}
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: 'kanji',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">{t('kanji')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: 'grammar',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">{t('grammar')}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Content */}
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default DictionaryLayout
