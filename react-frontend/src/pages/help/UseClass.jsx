import React from "react";

function UseClas() {
  return (
    <div className="container">
      <div className="useaccount">
        <h4>Study Flashcard?</h4>
        <ul className="useaccount-ul">
          <li>
            User can select multiple types of study in flashcards to display.
          </li>
          <li>
            After that, press the <strong>"Create new flashcards"</strong>{" "}
            button to get started.
          </li>
        </ul>
      </div>
      <div className="useaccount">
        <h4>Do Quiz?</h4>
        <ul className="useaccount-ul">
          <li>User can select multiple types of quiz to display.</li>
          <li>
            After that, press the <strong>"Create new quiz"</strong> button to
            get started.
          </li>
        </ul>
      </div>
      <div className="useaccount">
        <h4>Learn?</h4>
        <ul className="useaccount-ul">
          <li>User can select multiple types of quiz to display.</li>
          <li>
            After that, press the <strong>"Start"</strong> button to get
            started.
          </li>
        </ul>
      </div>
      <div className="useaccount">
        <h4>Create Class?</h4>
        <ul className="useaccount-ul">
          <li>
            With Tutor access, user can create class in header sidebar with icon{" "}
            <strong>"+"</strong> button.
          </li>
          <li>
            Select <strong>"Create Class"</strong>.
          </li>
          <li>
            Fill all field requirement on the screen and then click{" "}
            <strong>"Create"</strong> button.
          </li>
          <li>The class created will be displayed on the screen</li>
        </ul>
      </div>
      <div className="useaccount">
        <h4>Join Class?</h4>
        <ul className="useaccount-ul">
          <li>
            With Tutor or Learner access, user can join class in header sidebar
            with icon <strong>"+"</strong> button.
          </li>
          <li>
            Select <strong>"Join Class"</strong>.
          </li>
          <li>Input class code.</li>
          <li>
            Then, click <strong>"Join class"</strong> to join.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UseClas;
