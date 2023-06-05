import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
    })

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        async function fetchData() {
            const response = await EmployeeService.getEmployeeById(id)
            setEmployee(response.data)
        }

        if (id !== '_add') {
            fetchData()
        }
    }, [id])

    const saveOrUpdateEmployee = async (event) => {
        event.preventDefault()

        if (id === '_add') {
            await EmployeeService.createEmployee(employee)
            navigate('/employees')
        } else {
            await EmployeeService.updateEmployee(employee, id)
            navigate('/employees')
        }
    }

    const handleChange = (event) => {
        setEmployee({ ...employee, [event.target.name]: event.target.value })
    }

    const cancel = () => {
        navigate('/employees')
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {id === '_add' ? (
                            <h3 className="text-center">Add Employee</h3>
                        ) : (
                            <h3 className="text-center">Update Employee</h3>
                        )}

                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name:</label>
                                    <input
                                        placeholder="First Name"
                                        name="firstName"
                                        className="form-control"
                                        value={employee.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        className="form-control"
                                        value={employee.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email Address:</label>
                                    <input
                                        placeholder="Email Address"
                                        name="emailId"
                                        className="form-control"
                                        value={employee.emailId}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    className="btn btn-success"
                                    onClick={saveOrUpdateEmployee}
                                >
                                    Save
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={cancel}
                                    style={{ margin: '10px' }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateEmployee
