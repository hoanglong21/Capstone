import { useEffect } from 'react'
import { useState } from 'react'
import { SpeakIconSolid } from '../icons'

function TextToSpeech({
    className,
    text,
    language,
    disabled,
    size = '1.5rem',
}) {
    const [lang, setLang] = useState('ja-JP')

    useEffect(() => {
        if (language === 'ja') {
            setLang('ja-JP')
        }
        if (language === 'en') {
            setLang('en-GB')
        } 
        if (language === 'vi') {
            setLang('vi-VN')
        } 
    }, [language])

    async function handleClick() {
        if(lang==='vi-VN') {
            try {
                const response = await fetch('http://api.voicerss.org/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: new URLSearchParams({
                    key: 'd9d802353d1147889b17831e47051241',
                    src: text,
                    hl: 'vi-vn',
                    c: 'mp3',
                  }),
                });
          
                if (response.ok) {
                    const audioBlob = await response.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    // Create an Audio element and play the audio
                    const audioElement = new Audio(audioUrl);
                    audioElement.play();
                } else {
                  console.error('API call failed');
                }
              } catch (error) {
                console.error('Error fetching audio', error);
              } 
        } else {
            const msg = new SpeechSynthesisUtterance()
            msg.text = text
            // Set the default voice to a Japanese voice
            const japaneseVoice = window.speechSynthesis
                .getVoices()
                .find((voice) => voice.lang === lang)
            msg.voice = japaneseVoice
            window.speechSynthesis.speak(msg)
        }

        
    }

    return (
        <div className={className}>
            <button
                className="btn btn-customLight"
                onClick={handleClick}
                disabled={disabled}
            >
                <SpeakIconSolid size={size} />
            </button>
        </div>
    )
}

export default TextToSpeech
