import React, { useState } from "react";

function TextToSpeech() {
  const [text, setText] = useState("");

  function handleClick() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;

      // Set the default voice to a Japanese voice
    const japaneseVoice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'ja-JP');
    msg.voice = japaneseVoice;

    window.speechSynthesis.speak(msg);
  }

  return (
    <div>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter text to speak"
      />
      <button onClick={handleClick}>Speak</button>
    </div>
  );
}

export default TextToSpeech;