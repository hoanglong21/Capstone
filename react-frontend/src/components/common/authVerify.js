import { useEffect, useState } from 'react'
import { withRouter } from './withRouter'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import HistoryService from '../../services/HistoryService'
import UserService from '../../services/UserService'
import { getNumUnread } from '../../features/notify/notifyAction'

const AuthVerify = (props) => {
    let location = props.router.location
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [token, setToken] = useState('')
    const [user, setUser] = useState({})

    function setCookie(cname, cvalue, date, time) {
        var d = date === null ? new Date() : new Date(date)
        d.setTime(d.getTime() + time * 60 * 60 * 1000)
        let expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    }

    function getCookie(cname) {
        let name = cname + '='
        let decodedCookie = decodeURIComponent(document.cookie)
        let ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
    }

    useEffect(() => {
        const check = async () => {
            const username = jwtDecode(token).sub
            const tempUser = (await UserService.getUser(username)).data
            setUser(tempUser)
            dispatch(getNumUnread(tempUser.id))
        }
        if (token) {
            check()
        }
    }, [token])

    useEffect(() => {
        // history
        const check = async () => {
            // attendance
            if (getCookie(`userAttend_${user.username}`) == '') {
                try {
                    // check history attend
                    const historyAttend = (
                        await HistoryService.filterHistory(
                            `=${user.id}`,
                            '',
                            '=1',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '=1',
                            '=1'
                        )
                    ).data.list
                    if (historyAttend?.length === 0) {
                        HistoryService.createHistory(
                            {
                                historyType: { id: 1 },
                                user: { id: user.id, username: user.username },
                            },
                            null
                        )
                        setCookie(`userAttend_${user.username}`, token, null, 1)
                    } else {
                        const current = new Date()
                        const historyDate = new Date(historyAttend[0].datetime)
                        if (
                            current.getTime() - 60 * 60 * 1000 <
                            historyDate.getTime()
                        ) {
                            setCookie(
                                `userAttend_${user.username}`,
                                token,
                                historyAttend[0].datetime,
                                1
                            )
                        } else {
                            HistoryService.createHistory({
                                historyType: { id: 1 },
                                user: { id: user.id, username: user.username },
                            })
                            setCookie(
                                `userAttend_${user.username}`,
                                token,
                                null,
                                1
                            )
                        }
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data)
                    } else {
                        console.log(error.message)
                    }
                }
            }
            // class
            var id = null
            var locationPath = location.pathname
            if (locationPath.includes('/class/')) {
                const firstIndex = locationPath.indexOf('/class/')
                if (firstIndex + 7 == locationPath.length - 1) {
                    id = locationPath.slice(firstIndex + 7)
                } else {
                    id = locationPath.slice(firstIndex + 7, -1)
                    const lastIndex = id.indexOf('/')
                    id = Number(id.slice(0, lastIndex))
                }
                if (id > 0) {
                    if (getCookie(`user_${user?.username}_class_${id}`) == '') {
                        try {
                            // check history attend
                            const historyClass = (
                                await HistoryService.filterHistory(
                                    `=${user.id}`,
                                    `=${id}`,
                                    '=3',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '=1',
                                    '=1'
                                )
                            ).data.list
                            if (historyClass?.length === 0) {
                                HistoryService.createHistory(
                                    {
                                        historyType: { id: 3 },
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                        },
                                        classroom: {
                                            id: id,
                                        },
                                    },
                                    null
                                )
                                setCookie(
                                    `user_${user?.username}_class_${id}`,
                                    token,
                                    null,
                                    1
                                )
                            } else {
                                const current = new Date()
                                const historyDate = new Date(
                                    historyClass[0].datetime
                                )
                                if (
                                    current.getTime() - 60 * 60 * 1000 <
                                    historyDate.getTime()
                                ) {
                                    setCookie(
                                        `user_${user?.username}_class_${id}`,
                                        token,
                                        historyClass[0].datetime,
                                        1
                                    )
                                } else {
                                    HistoryService.createHistory({
                                        historyType: { id: 3 },
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                        },
                                        classroom: {
                                            id: id,
                                        },
                                    })
                                    setCookie(
                                        `user_${user?.username}_class_${id}`,
                                        token,
                                        null,
                                        1
                                    )
                                }
                            }
                        } catch (error) {
                            if (error.response && error.response.data) {
                                console.log(error.response.data)
                            } else {
                                console.log(error.message)
                            }
                        }
                    }
                }
            } else {
                id = null
            }
        }
        // notification
        const getNotification = () => {
            if (getCookie(`userNotification_${user.username}`) == '') {
                try {
                    setCookie(
                        `userNotification_${user.username}`,
                        token,
                        null,
                        0.02
                    )
                    dispatch(getNumUnread(user.id))
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data)
                    } else {
                        console.log(error.message)
                    }
                }
            }
        }
        if (user?.id) {
            check()
            getNotification()
        }
    }, [user, location])

    useEffect(() => {
        const check = async () => {
            const temp = localStorage.getItem('userToken')
            if (temp != token) {
                setToken(temp)
            }
            if (token) {
                // logout if token expired
                const decodedJwt = jwtDecode(token)
                if (decodedJwt.exp * 1000 < Date.now()) {
                    props.logOut()
                    navigate('/')
                    window.location.reload()
                }
            }
        }
        check()
    }, [location, props])

    return <div></div>
}

export default withRouter(AuthVerify)
