import React from "react";

function UseStudySet() {
  return (
    <div>
      <div className="container">
        <div>
          <h4>Study Flashcard?</h4>
          <ul>
            <li>
              User can select multiple types of study in flashcards to display.
            </li>
            <li>
              After that, press the <strong>"Create new flashcards"</strong>{" "}
              button to get started.
            </li>
          </ul>
        </div>
        <div>
          <h4>Do Quiz?</h4>
          <ul>
            <li>User can select multiple types of quiz to display.</li>
            <li>
              After that, press the <strong>"Create new quiz"</strong> button to
              get started.
            </li>
          </ul>
        </div>
        <div>
          <h4>Learn?</h4>
          <ul>
            <li>User can select multiple types of quiz to display.</li>
            <li>
              After that, press the <strong>"Start"</strong> button to get
              started.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseStudySet;
