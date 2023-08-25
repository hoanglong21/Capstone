import React, { useState, useEffect } from "react";
import SidebarforAdmin from "../SidebarforAdmin";
import { Link, useNavigate } from "react-router-dom";
import BanUser from "../BanUser";
import UnBanUser from "../UnBanUser";
import HeaderAdmin from "../HeaderAdmin";
import { useSearchParams } from "react-router-dom";
import UserService from '../../../services/UserService'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../../../components/Pagination";
function ManageUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userInfo } = useSelector((state) => state.user)
  const search = searchParams.get("search");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(1)
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
            '=15'
        )
    ).data.list
    setUsers(temp)
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
            <h3 className="mt-3 mb-4 text-bold text-black">Management Users</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
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
                  {users?.map((user) => (
                    <tr>
                      <th scope="row">{user?.id}</th>
                      <td>
                        <p className="text-info mb-0">{user?.username}</p>
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
                          data-bs-toggle="modal"
                          data-bs-target={`#unbanModal${user?.username}`}
                        >
                          <i class="bi bi-person-fill-check me-2"></i>
                          Unban
                        </button>
                        )}
                        <UnBanUser user={user}/>
                        {user?.status !== 'banned' && (
                        <button
                          type="button"
                          className="btn btn-danger "
                          data-bs-toggle="modal"
                          data-bs-target={`#banModal${user?.username}`}
                        >
                          <i class="bi bi-person-fill-slash me-2"></i>
                          Ban
                        </button>
                        )}
                        <BanUser user={user}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                        className="mb-5"
                        currentPage={page}
                        totalCount={totalItems}
                        pageSize={1}
                        onPageChange={(page) => {
                            setPage(page)
                        }}
                    />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManageUser;
