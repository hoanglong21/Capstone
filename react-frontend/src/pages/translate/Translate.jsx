import { useState } from 'react'

import { ExchangeIcon } from '../../components/icons'
import './Translate.css'

function Translate() {
    const [origText, setOrigText] = useState('')
    const [transText, setTransText] = useState('')
    const [sourceLang, setSourceLang] = useState('id')
    const [targetLang, setTargetLang] = useState('en')
    const [error, setError] = useState('')

    async function switchLanguage() {
        const oldTargetLang = targetLang
        const oldTransText = transText
        setTargetLang(sourceLang)
        setSourceLang(oldTargetLang)
        setTransText(origText)
        setOrigText(oldTransText)
    }

    const autoGrow = (event) => {
        console.log(event.target.style.height)
        event.target.style.height = '5px'
        event.target.style.height = event.target.scrollHeight + 'px'
    }

    return (
        <div className="translateContainer mx-auto mt-4">
            <div class="card">
                <div class="card-header d-flex">
                    <div className="flex-fill d-flex justify-content-center">
                        <select
                            id="sourceLang"
                            name="sourceLang"
                            class="form-select selectLang"
                            value={sourceLang}
                        >
                            <option value="ja">Japan</option>
                            <option value="vi">Vietnamese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <button className="btn mx-3" onClick={switchLanguage}>
                        <ExchangeIcon size="1.375rem" />
                    </button>
                    <div className="flex-fill d-flex justify-content-center">
                        <select
                            id="targetLang"
                            name="targetLang"
                            class="form-select selectLang"
                            value={targetLang}
                        >
                            <option value="ja">Japan</option>
                            <option value="vi">Vietnamese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
                <div class="card-body d-flex p-0">
                    <textarea
                        class="form-control translateInput"
                        id="floatingTextarea"
                        onInput={autoGrow}
                    ></textarea>
                    <textarea
                        class="form-control translateInput"
                        id="floatingTextarea"
                        onInput={autoGrow}
                        disabled
                    ></textarea>
                </div>
                <div class="card-footer text-body-secondary text-end">
                    <div>{origText.length} / 5000</div>
                </div>
            </div>
        </div>
    )
}

export default Translate
