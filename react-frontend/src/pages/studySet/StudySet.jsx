const StudySet = () => {
    return (
        <div className="setPage">
            <div className="setIntro">
                <div className="setTitle">
                    <h1>MLN131</h1>
                </div>
                <nav className="setNav">
                    <ul className="setNavList">
                        <li className="setNavItem">Flashcard</li>
                        <li className="setNavItem">Learn</li>
                        <li className="setNavItem">Quiz</li>
                    </ul>
                </nav>
            </div>
            <div className="setDetails">
                <div className="setDetailsInfo">
                    <div className="authorAvatar"></div>
                    <div className="authorContent">
                        <span className="createdBy"></span>
                        <a href="" className="authorUsername"></a>
                    </div>
                    <div className="setOptions">
                        <a href=""></a>
                        <a href=""></a>
                    </div>
                </div>
                <div className="setProgress">
                    <h4>Your progress</h4>
                    <ol>
                        <li>Not studied</li>
                        <li>Still learning</li>
                        <li>Mastered</li>
                    </ol>
                </div>
                <div className="setTerms">
                    <div className="termListTitle">
                        <span className="termListHeading">
                            Terms in this set (672)
                        </span>
                        <button className="termListControls"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StudySet
