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
                        `=${test?.user?.id}`,
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
        if (results?.user?.id) {
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
                            <tr key={index}>
                                <th scope="row"></th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TutorResults
