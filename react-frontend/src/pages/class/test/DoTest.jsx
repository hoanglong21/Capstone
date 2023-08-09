import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TestService from '../../../services/TestService'
import { getUser } from '../../../features/user/userAction'

import '../../../assets/styles/test.css'

const DoTest = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [test, setTest] = useState({})
    const [questions, setQuestions] = useState([])

    var minutesLabel = document.getElementById('minutesTest')
    var secondsLabel = document.getElementById('secondsTest')
    var totalSeconds = 0

    function setTime() {
        ++totalSeconds
        secondsLabel.innerHTML = pad(totalSeconds % 60)
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
    }

    function pad(val) {
        var valString = val + ''
        if (valString.length < 2) {
            return '0' + valString
        } else {
            return valString
        }
    }

    // fetch userInfo
    useEffect(() => {
        if (userToken && !userInfo?.id) {
            dispatch(getUser(userToken))
        }
    }, [userToken, userInfo])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // questions
                const tempQuestions = (
                    await TestService.startTest(userInfo.id, id)
                ).data
                setQuestions(tempQuestions)
                // test
                setTest(tempQuestions.questionList[0]?.question?.test)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (id && userInfo?.id) {
            fetchData()
            setInterval(setTime, 1000)
        }
    }, [id, userInfo])

    return (
        <div>
            {/* Header */}
            <div className="doTest_header d-flex justify-content-between align-items-center">
                <h3>{test?.title}</h3>
                <div>
                    <label id="minutesTest">00</label>:
                    <label id="secondsTest">00</label>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        navigate(`/set/${id}`)
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
export default DoTest
