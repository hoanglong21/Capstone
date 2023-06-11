import React, { useState } from 'react';
import '../assets/styles/Flashcard.css'

const Flashcard = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flashcard" onClick={toggleAnswer}>
      <div className="question">{question}</div>
      {showAnswer && <div className="answer">{answer}</div>}
    </div>
  );
};

export default Flashcard;