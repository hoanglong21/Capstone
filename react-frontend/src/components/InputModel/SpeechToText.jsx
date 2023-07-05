import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'

const SpeechToText = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({
        // Set language code to Japanese
        language: 'ja',
        // Display final result only
        interimResults: false,
    })

    const startListening = () =>
        SpeechRecognition.startListening({ continuous: true, language: 'ja' })

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    )
}

export default SpeechToText
