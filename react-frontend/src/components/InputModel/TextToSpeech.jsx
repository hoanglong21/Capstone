import { useEffect } from 'react'
import { useState } from 'react'
import { SpeakIconSolid } from '../icons'

function TextToSpeech({ className, text, language, disabled }) {
    const [lang, setLang] = useState('ja-JP')

    useEffect(() => {
        if (language === 'ja') {
            setLang('ja-JP')
        }
        if (language === 'en') {
            setLang('en-GB')
        }
    }, [language])

    function handleClick() {
        const msg = new SpeechSynthesisUtterance()
        msg.text = text

        // Set the default voice to a Japanese voice
        const japaneseVoice = window.speechSynthesis
            .getVoices()
            .find((voice) => voice.lang === lang)
        msg.voice = japaneseVoice

        window.speechSynthesis.speak(msg)
    }

    return (
        <div className={className}>
            <button
                className="btn btn-outline-secondary rounded-circle p-2"
                onClick={handleClick}
                disabled={disabled}
            >
                <SpeakIconSolid />
            </button>
        </div>
    )
}

export default TextToSpeech
