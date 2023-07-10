import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import DictionaryService from '../../services/DictionaryService'

const KanjiDict = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [kanjis, setKanjis] = useState([])
    const [word, setWord] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)

    const fetchData = async (searchKey) => {
        var tempKanjis = []
        if (searchKey.length > 1) {
            for (var i = 0; i < searchKey.length; i++) {
                var char = searchKey.charAt(i)
                const temp = (
                    await DictionaryService.getKanji('=1', '=10', `=${char}`)
                ).data.list
                tempKanjis.push(...temp)
            }
        } else {
            tempKanjis = (
                await DictionaryService.getKanji(
                    '=1',
                    '=10',
                    `${searchKey ? '=' + searchKey : ''}`
                )
            ).data.list
        }
        setKanjis(tempKanjis)
        setWord(tempKanjis[0])
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search])

    function getDisplay(words) {
        if (words) {
            var res = ''
            words.forEach((element) => {
                res += element + ', '
            })
            return res.substring(0, res.length - 2)
        }
        return ''
    }

    return (
        <div>
            <div className="row mt-4">
                <div className="col-2">
                    <div className="dictResultWordList">
                        {kanjis.map((kanji, index) => (
                            <div
                                className={`dictResultWord ${
                                    activeIndex === index ? 'active' : ''
                                }`}
                                key={index}
                                onClick={() => {
                                    setWord(kanji)
                                    setActiveIndex(index)
                                }}
                            >
                                <div className="word">
                                    <b className="me-2">{kanji.character}</b>
                                    {getDisplay(kanji.readingVietnam)}
                                </div>
                                <i className="wordSense">
                                    {getDisplay(kanji?.meanings)}
                                </i>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-10">
                    <div className="word-detail h-100">
                        <div className="kanji-search-header">
                            {word.character} -{' '}
                            {getDisplay(word?.readingVietnam)}
                        </div>
                        <div className="kanji-search-main">
                            <div className="row">
                                <div className="col-3">
                                    <div className="kanji-search-left">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: word.svgFile,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="kanji-search-right">
                                        <div>
                                            <div className="kanji-search-block ed">
                                                <label>Meaning:</label>
                                                <p>
                                                    {getDisplay(word?.meanings)}
                                                </p>
                                            </div>
                                            <div className="kanji-search-block ed">
                                                <label>Kanji radicals:</label>
                                                <p>
                                                    {getDisplay(word?.radicals)}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="kanji-search-block ed">
                                                <label>Onyomi:</label>
                                                <p>
                                                    {word?.readingJapaneseOn?.map(
                                                        (onyomi) => (
                                                            <p className="ony">
                                                                {onyomi}
                                                            </p>
                                                        )
                                                    )}
                                                </p>
                                            </div>
                                            <div className="kanji-search-block ed">
                                                <label>Kunyomi:</label>
                                                <p>
                                                    {word?.readingJapaneseKun?.map(
                                                        (kunyomi) => (
                                                            <p className="kuny">
                                                                {kunyomi}
                                                            </p>
                                                        )
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="kanji-search-block ed">
                                                <label>JLPT level:</label>
                                                <p className="kanji-search-bold">
                                                    {word?.jlptLevel
                                                        ? `N${word.jlptLevel}`
                                                        : ''}
                                                </p>
                                            </div>
                                            <div className="kanji-search-block ed">
                                                <label>Stroke count:</label>
                                                <p className="kanji-search-bold">
                                                    {word?.strokeCount}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default KanjiDict
