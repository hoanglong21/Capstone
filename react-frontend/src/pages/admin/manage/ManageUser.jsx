import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import UserService from '../../../services/UserService'

import HeaderAdmin from '../HeaderAdmin'
import UnBanUser from '../UnBanUser'
import BanUser from '../BanUser'
import SidebarforAdmin from '../SidebarforAdmin'

import 'react-toastify/dist/ReactToastify.css'
import Pagination from '../../../components/Pagination'

function ManageUser() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const [users, setUsers] = useState([])

    const [banUser, setBanUser] = useState({})
    const [banIndex, setBanIndex] = useState(0)
    const [showBanModal, setShowBanModal] = useState(false)

    const [unBanUser, setUnBanUser] = useState({})
    const [unBanIndex, setUnBanIndex] = useState(0)
    const [showUnBanModal, setShowUnBanModal] = useState(false)

    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const fetchData = async (searchKey) => {
        const temp = (
            await UserService.filterUserAdmin(
                '',
                `${searchKey ? '=' + searchKey : ''}`,
                '',
                '',
                '',
                '=tutor,learner',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                `=${page}`,
                '=7'
            )
        ).data
        setUsers(temp.list)
        setTotalItems(temp.totalItems)
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search, page])

    return (
        <div className="container-fluid">
            <div className="row">
                <SidebarforAdmin />
                <div className="col-10">
                    <HeaderAdmin />
                    <div className="container">
                        <ToastContainer />
                        <h3 className="mt-3 mb-4 text-bold text-black">
                            Management Users
                        </h3>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead style={{ backgroundColor: '#000' }}>
                                    <tr>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Username - Role</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                                    {users?.map((user, index) => (
                                        <tr>
                                            <th scope="row">{user?.id}</th>
                                            <td>
                                                <p className="text-info mb-0">
                                                    {user?.username}
                                                </p>
                                                {user?.role}
                                            </td>
                                            <td>{user?.email}</td>
                                            <td>{user?.phone}</td>
                                            <td>
                                                <Link
                                                    type="button"
                                                    className="btn btn-primary me-3"
                                                    to={`/viewdetailuser/${user.username}`}
                                                >
                                                    <i class="bi bi-info-square me-2"></i>
                                                    View Details
                                                </Link>
                                                {user?.status === 'banned' && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-success me-3"
                                                        onClick={() => {
                                                            setUnBanIndex(index)
                                                            setUnBanUser(user)
                                                            setShowUnBanModal(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        <i class="bi bi-person-fill-check me-2"></i>
                                                        Unban
                                                    </button>
                                                )}
                                                {user?.status !== 'banned' && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger "
                                                        onClick={() => {
                                                            setBanIndex(index)
                                                            setBanUser(user)
                                                            setShowBanModal(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        <i class="bi bi-person-fill-slash me-2"></i>
                                                        Ban
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                                className="mb-4"
                                currentPage={page}
                                totalCount={totalItems}
                                pageSize={7}
                                onPageChange={(page) => {
                                    setPage(page)
                                }}
                            />
                    </div>
                </div>
            </div>
            {/* ban modal */}
            <BanUser
                user={banUser}
                users={users}
                setUsers={setUsers}
                index={banIndex}
                showBanModal={showBanModal}
                setShowBanModal={setShowBanModal}
            />
            {/* unBan modal */}
            <UnBanUser
                user={unBanUser}
                users={users}
                setUsers={setUsers}
                index={unBanIndex}
                showUnBanModal={showUnBanModal}
                setShowUnBanModal={setShowUnBanModal}
            />
        </div>
    )
}
export default ManageUser
