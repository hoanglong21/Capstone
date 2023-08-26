import { usePagination, DOTS } from '../hooks/usePagination '

const Pagination = (props) => {
    const {
        small,
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null
    }
    
    const onNext = (event) => {
        event.stopPropagation()
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1)
        }
    }

    const onPrevious = (event) => {
        event.stopPropagation()
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    let lastPage = paginationRange[paginationRange.length - 1]
    
    return (
        <nav>
            <ul
                className={`pagination ${
                    small === true && 'pagination-sm'
                } justify-content-center ${className}`}
            >
                {/* Left navigation arrow */}
                <li
                    className={`page-item ${
                        currentPage === 1 ? 'disabled' : ''
                    }`}
                    onClick={onPrevious}
                >
                    <span className="page-link">Previous</span>
                </li>
                {paginationRange.map((pageNumber, index) => {
                    // If the pageItem is a DOT, render the DOTS unicode character
                    if (pageNumber === DOTS) {
                        return (
                            <li key={index} className="page-item">
                                <span className="page-link dots">&#8230;</span>
                            </li>
                        )
                    }

                    // Render our Page Pills
                    return (
                        <li
                            key={index}
                            className={`page-item ${
                                pageNumber === currentPage ? 'active' : ''
                            }`}
                            onClick={(event) => {
                                event.stopPropagation()
                                onPageChange(pageNumber)
                            }}
                        >
                            <span className="page-link">{pageNumber}</span>
                        </li>
                    )
                })}
                {/*  Right Navigation arrow */}
                <li
                    className={`page-item ${
                        currentPage === lastPage ? 'disabled' : ''
                    }`}
                    onClick={onNext}
                >
                    <span className="page-link">Next</span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
