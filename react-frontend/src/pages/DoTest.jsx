import React from "react";
import "../assets/styles/test.css"

function DoTest() {
  return (
    <div className="containerTest">
      <h3>Vocabulary - Grammar Lesson 3 Test</h3>
      <p>Timing out: 20:00:00</p>
      <section>
        <form className="quizForm">
          <h5>1. What is the correct translation for "telephone"?</h5>
          <input type="radio" className="answerTest" value="a" id="answerTesta" />
          a. 本
          <br />
          <input type="radio" className="answerTest" value="b" id="answerTestb" />
          b. 電話
          <br />
          <input type="radio" className="answerTest" value="a" id="answerTestc" />
          a. ペン
          <br />
          <input type="radio" className="answerTest" value="b" id="answerTestd" />
          b. 電気
          <br />
          <h5>2. How do you say "Good morning"?</h5>
          <input type="radio" className="answerTest" value="a" id="answerTesta" />
          a. おはよう<br />
          <input type="radio" className="answerTest" value="b" id="answerTestb" />
          b. すみません<br />
          <input type="radio" className="answerTest" value="c" id="answerTestc" />
          c. こんばんは<br />
          <input type="radio" className="answerTest" value="d" id="answerTestd" />
          d. No correct answer
          <br />
          <h5>3. "Good evening" is "こんばんは"?</h5>
          <input type="radio" className="answerTest" value="a" id="answerTesta" />
          a. True
          <br />
          <input type="radio" className="answerTest" value="b" id="answerTestb" />
          b. False
          <br />
          <h5>4. What is the correct translation for "Please"?</h5>
          <input type="radio" className="answerTest" value="a" id="answerTesta" />
          a. おねがいだから<br />
          <input type="radio" className="answerTest" value="b" id="answerTestb" />
          b. しつれい<br />
          <input type="radio" className="answerTest" value="c" id="answerTestc" />
          c. こんにちは<br />
          <input type="radio" className="answerTest" value="d" id="answerTestd" />
          d.  No correct answer
          <br />
          <br />
          <br />
          <input type="submit" value="Submit Answers" className="submitTest"/>
        </form>
        <div className="results"></div>
      </section>
    </div>
  );
}

export default DoTest;
