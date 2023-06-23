import React from 'react'
import '../assets/styles/Home.css'

function Home() {
    return (
        <>
            <div className="content__search">
                <input
                    type="text"
                    alt="enter search"
                    autocomplete="off"
                    id="search-text-box"
                    focus-me=""
                    autofocus=""
                    class="bg-w-gray"
                    placeholder="日本, Japanese, Nhật Bản"
                ></input>
            </div>
            <div id="btn-wrapper" className="btn-group search-option">
                <div className="btn-group-wrapper">
                    <button
                        aria-label="word"
                        id="tab0"
                        className="btn btn-tab-search bg-content-df search-option-word tab-active"
                    >
                        {' '}
                        Vocabulary{' '}
                    </button>
                    <button
                        aria-label="kanji"
                        id="tab1"
                        className="btn btn-tab-search bg-content-df search-option-kanji"
                    >
                        Kanji
                    </button>
                    <button
                        aria-label="grammar"
                        id="tab2"
                        className="btn btn-tab-search bg-content-df search-option-grammar"
                    >
                        Grammar
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home
