import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import DictionaryService from '../../services/DictionaryService'
import TextToSpeech from '../../components/InputModel/TextToSpeech'

const VocabDict = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [vocabs, setVocabs] = useState([])
    const [word, setWord] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    const [kanjiSvgs, setKanjiSvgs] = useState([])

    const fetchData = async (searchKey) => {
        const temp = (
            await DictionaryService.getVocabulary(
                '=1',
                '=10',
                `${searchKey ? '=' + searchKey : ''}`,
                ''
            )
        ).data.list
        setVocabs(temp)
        setWord(temp[0])
        var tempKanjiSvgs = []
        for (var i = 0; i < temp[0].kanji[0].length; i++) {
            const svg = (
                await DictionaryService.getKanjivg(temp[0].kanji[0].charAt(i))
            ).data
            tempKanjiSvgs.push({ kanji: temp[0].kanji[0].charAt(i), svg: svg })
        }
        setKanjiSvgs(tempKanjiSvgs)
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
            <div className="row mt-4 mb-5">
                <div className="col-2 ">
                    <div className="dictResultWordList">
                        {vocabs.map((vocab, index) => (
                            <div
                                className={`dictResultWord ${
                                    activeIndex === index ? 'active' : ''
                                }`}
                                key={index}
                                onClick={() => {
                                    setWord(vocab)
                                    setActiveIndex(index)
                                }}
                            >
                                <div className="word">
                                    <b>{vocab.kanji}</b> [
                                    {getDisplay(vocab.reading)}]
                                </div>
                                <i className="wordSense">
                                    {getDisplay(vocab.sense[0].definition)}
                                </i>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-7">
                    <div className="word-detail h-100">
                        <div className="word-detail-overview d-flex flex-column align-items-center">
                            <span className="txtKanji">{word?.kanji}</span>
                            <div className="d-flex">
                                <span className="txtFurigana">
                                    {getDisplay(word?.reading)}
                                </span>
                                <span className="sound">
                                    <TextToSpeech
                                        className="ms-1"
                                        text={word?.kanji}
                                        language="ja"
                                        size="1.25rem"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="word-detail-info">
                            {word?.sense?.map((item, index) => (
                                <div key={index}>
                                    <div className="word-type">
                                        {getDisplay(item.type)}
                                    </div>
                                    <div className="word-meaning">
                                        - {getDisplay(item.definition)}
                                    </div>
                                    <ul className="word-examples">
                                        {item.example.map(
                                            (exampleItem, index) => (
                                                <div key={index}>
                                                    <div className="wordExampleJa">
                                                        {
                                                            exampleItem.exampleSentenceJapanese
                                                        }
                                                    </div>
                                                    <div className="wordExampleVi">
                                                        {
                                                            exampleItem.exampleSentenceVietnamese
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div
                        className="accordion accordion-flush"
                        id="accordionKanjiSvg"
                    >
                        {kanjiSvgs.map((kanjiSvg, index) => (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#svgKanji${index}`}
                                        aria-expanded="false"
                                        aria-controls={`svgKanji${index}`}
                                    >
                                        {kanjiSvg?.kanji}
                                    </button>
                                </h2>
                                <div
                                    id={`svgKanji${index}`}
                                    className="accordion-collapse collapse"
                                >
                                    <div
                                        className="svgKanji accordion-body d-flex justify-content-center"
                                        dangerouslySetInnerHTML={{
                                            __html: kanjiSvg?.svg,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VocabDict
