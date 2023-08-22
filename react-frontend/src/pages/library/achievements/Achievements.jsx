import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import UserAchievementService from '../../../services/UserAchievement'

import nightowl from '../../../assets/achievements/NightOwl.svg'
import activeLearner from '../../../assets/achievements/activeLearner.svg'
import committedLearner from '../../../assets/achievements/committedLearner.svg'
import createfirstset from '../../../assets/achievements/CreatedFirstSet.svg'
import studywithtest from '../../../assets/achievements/StudiedWithTest.svg'
import earkyBird from '../../../assets/achievements/EarlyBird.svg'
import streak from '../../../assets/achievements/streak.svg'
import setStudied from '../../../assets/achievements/badge-SetsStudied.svg'
import member from '../../../assets/achievements/badge-Week.svg'
import './achievement.css'
import UserService from '../../../services/UserService'

function Achievements() {
    const { name } = useParams()
    const { userInfo } = useSelector((state) => state.user)

    const [user, setUser] = useState({})
    const [awards, setAwards] = useState([])
    const [streaks, setStreaks] = useState([])
    const [roundStudied, setRoundStudied] = useState([])
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            var tempUser = {}
            if (userInfo.username != name) {
                tempUser = (await UserService.getUser(name)).data
            }
            const tempAchievements = (
                await UserAchievementService.getUserAchievementByUserId(
                    tempUser?.id || userInfo.id
                )
            ).data
            setAwards(tempAchievements.study)
            setStreaks(tempAchievements.streaks)
            setRoundStudied(tempAchievements.lifetime)
            setClasses(tempAchievements.class)
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    return (
        <div className="my-5">
            <div className="row gx-3 mb-5">
                <div className="col-xl-12 col-lg-12">
                    <h4 className="achievement_title mb-3">Studying</h4>
                    <div className="card achievement_section">
                        <div className="card-body achievement">
                            {awards?.length === 0 ? (
                                <div className="empty">
                                    You don't have any achievements yet.
                                </div>
                            ) : (
                                awards?.map((item, index) => {
                                    switch (item.achievement.id) {
                                        case 1:
                                            // Active learner
                                            return (
                                                <div
                                                    className="achievement-streak"
                                                    key={index}
                                                >
                                                    <div className="streak-ct">
                                                        <div className="streak-img">
                                                            <img
                                                                src={
                                                                    activeLearner
                                                                }
                                                                alt="nightowl"
                                                                className="img1"
                                                            />
                                                        </div>
                                                        Active learner
                                                        <span className="streak-date">
                                                            24 tháng 3, 2023
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        case 2:
                                            // Committed learner
                                            return (
                                                <div
                                                    className="achievement-streak"
                                                    key={index}
                                                >
                                                    <div className="streak-ct">
                                                        <div className="streak-img">
                                                            <img
                                                                src={
                                                                    committedLearner
                                                                }
                                                                alt="nightowl"
                                                                className="img1"
                                                            />
                                                        </div>
                                                        Committed learner
                                                        <span className="streak-date">
                                                            24 tháng 3, 2023
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        case 3:
                                            // Night owl
                                            return (
                                                <div
                                                    className="achievement-streak"
                                                    key={index}
                                                >
                                                    <div className="streak-ct">
                                                        <div className="streak-img">
                                                            <img
                                                                src={nightowl}
                                                                alt="nightowl"
                                                                className="img1"
                                                            />
                                                        </div>
                                                        Night owl
                                                        <span className="streak-date">
                                                            24 tháng 3, 2023
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        case 4:
                                            // Early bird
                                            return (
                                                <div
                                                    className="achievement-streak"
                                                    key={index}
                                                >
                                                    <div className="streak-ct">
                                                        <div className="streak-img">
                                                            <img
                                                                src={earkyBird}
                                                                alt="nightowl"
                                                                className="img1"
                                                            />
                                                        </div>
                                                        Early bird
                                                        <span className="streak-date">
                                                            24 tháng 3, 2023
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        case 5:
                                            // Test acer
                                            return (
                                                <div
                                                    className="achievement-streak"
                                                    key={index}
                                                >
                                                    <div className="streak-ct">
                                                        <div className="streak-img">
                                                            <img
                                                                src={
                                                                    studywithtest
                                                                }
                                                                alt="nightowl"
                                                                className="img1"
                                                            />
                                                        </div>
                                                        Test acer
                                                        <span className="streak-date">
                                                            24 tháng 3, 2023
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        case 6:
                                            // Set builder
                                            return (
                                                <div
                                                    className="achievement-streak"
                                                    key={index}
                                                >
                                                    <div className="streak-ct">
                                                        <div className="streak-img">
                                                            <img
                                                                src={
                                                                    createfirstset
                                                                }
                                                                alt="nightowl"
                                                                className="img1"
                                                            />
                                                        </div>
                                                        Set builder
                                                        <span className="streak-date">
                                                            24 tháng 3, 2023
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        default:
                                            break
                                    }
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row gx-3 mb-5">
                <div className="col-xl-12 col-lg-12">
                    <h4 className="achievement_title mb-3">Streaks</h4>
                    <div className="card achievement_section">
                        <div className="card-body achievement">
                            {streaks?.length === 0 ? (
                                <div className="empty">
                                    You don't have any achievements yet.
                                </div>
                            ) : (
                                streaks?.map((item, index) => (
                                    <div
                                        className="achievement-streak"
                                        key={index}
                                    >
                                        <div className="streak-ct">
                                            <div className="streak-img">
                                                <img
                                                    src={streak}
                                                    alt="nightowl"
                                                    className="img1"
                                                />
                                                <span className="forspan">
                                                    {item?.achievement?.value}
                                                </span>
                                            </div>
                                            {item?.achievement?.name}
                                            <span className="streak-date">
                                                {item?.created_date}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row gx-3 mb-5">
                <div className="col-xl-12 col-lg-12">
                    <h4 className="achievement_title mb-3">Rounds studied</h4>
                    <div className="card achievement_section">
                        <div className="card-body achievement">
                            {roundStudied?.length === 0 ? (
                                <div className="empty">
                                    You don't have any achievements yet.
                                </div>
                            ) : (
                                roundStudied?.map((item, index) => (
                                    <div
                                        className="achievement-streak"
                                        key={index}
                                    >
                                        <div className="streak-ct">
                                            <div className="streak-img">
                                                <img
                                                    src={setStudied}
                                                    alt="nightowl"
                                                    className="img1"
                                                />
                                                <span className="forspan-set">
                                                    {item?.achievement?.value}
                                                </span>
                                            </div>
                                            {item?.achievement?.name}
                                            <span className="streak-date">
                                                {item?.created_date}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row gx-3 mb-5">
                <div className="col-xl-12 col-lg-12">
                    <h4 className="achievement_title mb-3">Member</h4>
                    <div className="card achievement_section mb-5">
                        <div className="card-body achievement">
                            {classes?.length === 0 ? (
                                <div className="empty">
                                    You don't have any achievements yet.
                                </div>
                            ) : (
                                classes?.map((item, index) => (
                                    <div
                                        className="achievement-streak"
                                        key={index}
                                    >
                                        <div className="streak-ct">
                                            <div className="streak-img">
                                                <img
                                                    src={member}
                                                    alt="nightowl"
                                                    className="img1"
                                                />
                                                <span className="forspan-mem">
                                                    {item?.achievement?.value}
                                                </span>
                                            </div>
                                            {item?.achievement?.name}
                                            <span className="streak-date">
                                                {item?.created_date}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievements
