import { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal'

import UserService from '../../services/UserService'

import 'react-toastify/dist/ReactToastify.css'

const BanUser = ({
    user,
    users,
    setUsers,
    index,
    showBanModal,
    setShowBanModal,
}) => {
    const [error, setError] = useState('')

    const handleBan = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await UserService.banUser(user.username)
            toast.success(`Banned ${user.username} successfully!`, {
                position: toast.POSITION.TOP_RIGHT,
            })
            var tempUsers = [...users]
            tempUsers[index] = { ...user, status: 'banned' }
            setUsers(tempUsers)
            setShowBanModal(false)
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
            show={showBanModal}
            onHide={() => {
                setShowBanModal(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>BAN USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <p>
                    Are you sure you want to ban{' '}
                    <strong>{user.username}</strong> ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                        setShowBanModal(false)
                    }}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    onClick={handleBan}
                >
                    Ban
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default BanUser
