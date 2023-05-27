import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const response = await EmployeeService.getEmployees()
            setEmployees(response.data)
        }

        fetchData()
    }, [])

    const addEmployee = () => {
        navigate('/add-employee/_add')
    }

    const editEmployee = (id) => {
        navigate(`/add-employee/${id}`)
    }

    const deleteEmployee = async (id) => {
        const response = await EmployeeService.deleteEmployee(id)
        if (response.data.deleted) {
            setEmployees(employees.filter((employee) => employee.id !== id))
        }
    }

    const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`)
    }

    return (
        <div>
            <h2 className="text-center">Employee List</h2>

            <div className="row">
                <button className="btn btn-primary" onClick={addEmployee}>
                    Add Employee
                </button>
            </div>

            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees?.map((employee) => {
                            return (
                                <tr key={employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                editEmployee(employee.id)
                                            }
                                            className="btn btn-info"
                                        >
                                            Update
                                        </button>

                                        <button
                                            style={{ marginLeft: '10px' }}
                                            onClick={() =>
                                                deleteEmployee(employee.id)
                                            }
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            style={{ marginLeft: '10px' }}
                                            onClick={() =>
                                                viewEmployee(employee.id)
                                            }
                                            className="btn btn-info"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListEmployeeComponent
