import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import TestService from '../../../services/TestService'
import { useTranslation } from 'react-i18next'

const Results = () => {
    const navigate = useNavigate()
    const { test_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [test, setTest] = useState({})
    const [results, setResults] = useState([])
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (test_id.includes('.')) {
            navigate('/notFound')
            return
        }
    }, [])

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // test
                const tempTest = (await TestService.getTestById(test_id)).data
                setTest(tempTest)
                // results
                const tempResults = (
                    await TestService.getTestLearner(
                        `${
                            userInfo?.id === tempTest?.user?.id
                                ? ''
                                : `=${userInfo?.username}`
                        }`,
                        `=${tempTest?.classroom?.id}`,
                        `=${tempTest?.user?.id}`,
                        `=${tempTest?.id}`,
                        '',
                        '',
                        '',
                        '=1',
                        '=10'
                    )
                ).data
                setResults(tempResults)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
        }
        if (userInfo?.id && test_id) {
            fetchData()
        }
    }, [test_id, userInfo])

    return (
        <div className="instruction_container testResult_container">
            <div className="instruction_heading">
                {test?.title ? test?.title : test?._draft ? 'Draft' : '...'}
            </div>
            <div className="table-responsive">
                <table className="table table-transparent table-hover mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('mark')}</th>
                            <th scope="col">{t('noAttempt')}</th>
                            <th scope="col">{t('start')}</th>
                            <th scope="col">{t('end')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results?.map((result, index) => (
                            <>
                                <tr>
                                    <th
                                        scope="row"
                                        rowSpan={
                                            result?.testLearner?.length > 1
                                                ? result?.testLearner?.length
                                                : 1
                                        }
                                    >
                                        {result?.classLearner?.user?.username}
                                    </th>
                                    <td>
                                        {result?.testLearner?.length === 0 &&
                                        test?.due_date &&
                                        new Date(test?.due_date) >
                                            new Date() ? (
                                            <div style={{ color: '#d50000' }}>
                                                {t('missing')}
                                            </div>
                                        ) : isNaN(
                                              result?.testLearner[0]?.mark
                                          ) ? (
                                            ''
                                        ) : (
                                            result?.testLearner[0]?.mark
                                        )}
                                    </td>
                                    <td>
                                        {result?.testLearner[0]?.num_attempt}
                                    </td>
                                    <td>{result?.testLearner[0]?.start}</td>
                                    <td>{result?.testLearner[0]?.end}</td>
                                </tr>
                                {result?.testLearner?.length > 1 &&
                                    result?.testLearner?.map(
                                        (resultItem, index) => {
                                            if (index > 0) {
                                                return (
                                                    <tr key={`${index}_1`}>
                                                        <td>
                                                            {resultItem?.mark}
                                                        </td>
                                                        <td>
                                                            {
                                                                resultItem?.num_attempt
                                                            }
                                                        </td>
                                                        <td>
                                                            {resultItem?.start}
                                                        </td>
                                                        <td>
                                                            {resultItem?.end}
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        }
                                    )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Results
