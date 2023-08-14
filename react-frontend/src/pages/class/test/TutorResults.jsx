import { useEffect } from 'react'
import { useState } from 'react'
import TestService from '../../../services/TestService'

const TutorResults = ({ test }) => {
    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempResults = (
                    await TestService.getTestLearner(
                        '',
                        `=${test?.classroom?.id}`,
                        `=${test?.user?.id}`,
                        `=${test?.id}`,
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
            }
        }
        if (test?.user?.id) {
            fetchData()
        }
    }, [test])

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
                            <th scope="col">Mark</th>
                            <th scope="col">No of attempt</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results?.map((result, index) => (
                            <>
                                <tr key={index}>
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
                                    <td>{result?.testLearner[0]?.mark}</td>
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
                                                    <tr key={index}>
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
export default TutorResults
