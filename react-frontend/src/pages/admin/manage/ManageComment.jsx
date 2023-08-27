import React, {useState, useEffect} from "react";
import SidebarforAdmin from "../SidebarforAdmin";
import HeaderAdmin from "../HeaderAdmin";
import { Link } from "react-router-dom";
import CommentService from "../../../services/CommentService";
import { useSearchParams } from 'react-router-dom'
import Pagination from "../../../components/Pagination";

function ManageComment() {
  const [comment, setComment] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const search = searchParams.get('search')
    const fetchData = async (searchKey) => {
      let temp;
      try{
        temp = (
            await CommentService.getFilterList(
                '',
                `${searchKey ? '=' + searchKey : ''}`,
                '',
                '',
                '',
                '',
                 `=${page}`,
                '=10',
            )
        ).data
        setComment(temp.list)
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
              View Comment
            </h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">Comment ID</th>
                    <th scope="col">Type</th>
                    <th scope="col">Creator By</th>
                    <th scope="col">Created_Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {comment?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                {comment?.map((comments) => (
                  <tr>
                    <th scope="row" key={comments.id}>{comments?.id}</th>
                    <td>{comments?.commentType?.name}</td>
                    <td>{comments?.user?.username}</td>
                    <td>{comments?.created_date}</td>
                    <td>
                      <Link
                        to={`/viewdetailcomment/${comments.id}`}
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

export default ManageComment;
