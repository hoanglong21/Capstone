import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'

import UserService from '../../services/UserService'

import 'react-toastify/dist/ReactToastify.css'

const UnBanUser = ({
    user,
    users,
    setUsers,
    index,
    showUnBanModal,
    setShowUnBanModal,
}) => {
    const [error, setError] = useState('')

    const handleUnBan = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await UserService.recoverUser(user.username)
            toast.success(`Unbanned ${user.username} successfully!`, {
                position: toast.POSITION.TOP_RIGHT,
            })
            var tempUsers = [...users]
            tempUsers[index] = { ...user, status: 'active' }
            setUsers(tempUsers)
            setShowUnBanModal(false)
            setError('')
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
    }

    return (
        <Modal
            show={showUnBanModal}
            onHide={() => {
                setShowUnBanModal(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>UNBAN USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && (
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>
                )}
                <p>
                    Are you sure you want to unban{' '}
                    <strong>{user.username}</strong>?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowUnBanModal(false)}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    class="btn btn-success"
                    onClick={handleUnBan}
                >
                    Sure!
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default UnBanUser
