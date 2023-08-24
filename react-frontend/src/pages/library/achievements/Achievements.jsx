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
import { useTranslation } from 'react-i18next'

function Achievements() {
    const { name } = useParams()
    const { userInfo } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)

    const [awards, setAwards] = useState([])
    const [streaks, setStreaks] = useState([])
    const [roundStudied, setRoundStudied] = useState([])
    const [classes, setClasses] = useState([])
    const { userLanguage } = useSelector((state) => state.user)

    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempAchievements = (
                    await UserAchievementService.getUserAchievementByUsername(
                        name || userInfo.username
                    )
                ).data
                setAwards(tempAchievements.study)
                setStreaks(tempAchievements.streaks)
                setRoundStudied(tempAchievements.lifetime)
                setClasses(tempAchievements.class)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        fetchData()
    }, [userInfo])

    return (
        <div className="my-5">
            <div className="row gx-3 mb-5">
                <div className="col-xl-12 col-lg-12">
                    <h4 className="achievement_title mb-3">{t('studying')}</h4>
                    <div className="card achievement_section">
                        <div className="card-body achievement">
                            {awards?.length === 0 ? (
                                <div className="empty">
                                    {name === userInfo?.username
                                        ? t('anyAchieve')
                                        : t('anyAchieveNot')}
                                    .
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
                                                        {t('activeLearner')}
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
                                                        {t('commitLearner')}
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
                                                        {t('owl')}
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
                                                        {t('bird')}
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
                                                        {t('testAcer')}
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
                                                        {t('builder')}
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
                    <h4 className="achievement_title mb-3">{t('streaks')}</h4>
                    <div className="card achievement_section">
                        <div className="card-body achievement">
                            {streaks?.length === 0 ? (
                                <div className="empty">
                                    {name === userInfo?.username
                                        ? t('anyAchieve')
                                        : t('anyAchieveNot')}
                                    .
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
                    <h4 className="achievement_title mb-3">{t('round')}</h4>
                    <div className="card achievement_section">
                        <div className="card-body achievement">
                            {roundStudied?.length === 0 ? (
                                <div className="empty">
                                    {name === userInfo?.username
                                        ? t('anyAchieve')
                                        : t('anyAchieveNot')}
                                    .
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
                    <h4 className="achievement_title mb-3">{t('member')}</h4>
                    <div className="card achievement_section mb-5">
                        <div className="card-body achievement">
                            {classes?.length === 0 ? (
                                <div className="empty">
                                    {name === userInfo?.username
                                        ? t('anyAchieve')
                                        : t('anyAchieveNot')}
                                    .
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
