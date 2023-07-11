import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'
import ClassService from '../../../services/ClassService'

import InstructionEditor from '../../../components/textEditor/InstructionEditor'

import { DeleteIcon, UploadIcon } from '../../../components/icons'

function CreateAssignment() {
    const { id } = useParams()
    const { userInfo } = useSelector((state) => state.user)

    const [classroom, setClassroom] = useState({})
    const [assignment, setAssignment] = useState({})
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [uploadFiles, setUploadFiles] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const tempClass = (await ClassService.getClassroomById(id)).data
            setClassroom(tempClass)
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            setUploadFiles([
                ...uploadFiles,
                { file_name: file.name, file_type: file.type, file_url: file },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleDeleteFile = (index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        setUploadFiles(temp)
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Link to="../assignments" className="createAssign_cancelBtn">
                    cancel
                </Link>
                <div className="d-flex">
                    <button className="createAssign_submitBtn">Assign</button>
                    <div className="dropdown">
                        <button
                            className="createAssign_dropdownBtn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        ></button>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" href="#">
                                    Assign
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Save draft
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body p-4">
                    <div className="createAssign_formGroup form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="title"
                        />
                        <label
                            htmlFor="title"
                            className="createAssign_formLabel"
                        >
                            Title
                        </label>
                    </div>
                    <div className="createAssign_formGroup form-floating mb-4">
                        <InstructionEditor />
                        <label className="createAssign_formLabel createAssign_editorLabel">
                            Instruction (Optional)
                        </label>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="createAssign_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="start_date"
                                    id="start_date"
                                    placeholder="start date"
                                />
                                <label
                                    htmlFor="start_date"
                                    className="createAssign_formLabel"
                                >
                                    Start date
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="createAssign_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="due_date"
                                    name="due_date"
                                    placeholder="due date"
                                />
                                <label
                                    htmlFor="due_date"
                                    className="createAssign_formLabel"
                                >
                                    Due date
                                </label>
                            </div>
                        </div>
                    </div>
                    {uploadFiles.map((file, index) => (
                        <div className="card mb-2" key={index}>
                            <div className="card-body d-flex justify-content-between">
                                <a
                                    className="text-decoration-none w-100"
                                    href={file.file_url}
                                    target="_blank"
                                >
                                    <div className="fileUploadName">
                                        {file.file_name}
                                    </div>
                                    <div className="fileUploadType">
                                        {file.file_type}
                                    </div>
                                </a>
                                <button
                                    className="btn fileUploadDelButton"
                                    onClick={() => handleDeleteFile(index)}
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                    <input
                        type="file"
                        id="uploadPostFile"
                        className="postUpload"
                        onChange={handleUploadFile}
                    />
                    <button type="btn" disabled={loadingUploadFile}>
                        <label
                            htmlFor="uploadPostFile"
                            className="postUploadButton p-2 rounded-circle d-flex align-items-center justify-content-center"
                        >
                            {loadingUploadFile ? (
                                <div
                                    className="spinner-border spinner-border-sm text-secondary"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        LoadingUpload...
                                    </span>
                                </div>
                            ) : (
                                <UploadIcon strokeWidth="2" />
                            )}
                        </label>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateAssignment
