import React, {useState, useEffect} from "react";
import SidebarforAdmin from "../SidebarforAdmin";
import HeaderAdmin from "../HeaderAdmin";
import { Link } from "react-router-dom";
import TestService from "../../../services/TestService";
import { useSearchParams } from 'react-router-dom'
import Pagination from "../../../components/Pagination";

function ManageTest() {
  const [tests, setTests] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const search = searchParams.get('search')
    const fetchData = async (searchKey) => {
      let temp;
      try{
        temp = (
            await TestService.getFilterList(
                '',
                `${searchKey ? '=' + searchKey : ''}`,
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
                '=10',
            )
        ).data
        setTests(temp.list)
        setTotalItems(temp.totalItems)
      }catch(error){
        if (error.response && error.response.data) {
          setError(error.response.data)
      } else {
          setError(error.message)
      }
      return console.log(error)
      }
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
            <h3 className="mt-3 mb-4 text-bold text-black">
              View Test
            </h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">Test ID</th>
                    <th scope="col">Class Name</th>
                    <th scope="col">Creator By</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {tests?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                {tests?.map((test) => (
                  <tr>
                    <th scope="row" key={test.id}>{test?.id}</th>
                    <td>{test?.classname}</td>
                    <td>{test?.authorname}</td>
                    <td>{test?.title}</td>
                    <td>{test?.description}</td>
                    <td>
                      <Link
                        to={`/viewdetailtest/${test.id}`}
                        className="btn btn-primary me-3"
                      >
                        <i class="bi bi-info-square me-2"></i>
                        View Details
                      </Link>
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
                                pageSize={10}
                                onPageChange={(page) => {
                                    setPage(page)
                                }}
                            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTest;
