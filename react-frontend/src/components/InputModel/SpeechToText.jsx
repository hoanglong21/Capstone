import { useEffect } from 'react'
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'

const SpeechToText = ({
    language,
    handleSpeechToText,
    refresh,
    stateChanger,
}) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({
        // Set language code to Japanese
        language: language,
        // Display final result only
        interimResults: false,
    })

    useEffect(() => {
        if (refresh) {
            resetTranscript()
            stateChanger(false)
        }
    }, [refresh])

    const startListening = () =>
        SpeechRecognition.startListening({
            continuous: true,
            language: language,
        })

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={startListening}>Start</button>
            <button
                onClick={(event) => {
                    SpeechRecognition.stopListening()
                    handleSpeechToText(transcript)
                }}
            >
                Stop
            </button>
        </div>
    )
}

export default SpeechToText
