import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  let timerId = 0;

  // add useEffect code
  useEffect(() => {
    setTimer();

    return function cleanup() {
      clearTimeout(timerId);
    };
  }, [timeRemaining]);
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  function setTimer() {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      if (timeRemaining - 1 <= 0) {
        onAnswered(false);
        setTimeRemaining(10);
      } else {
        setTimeRemaining(() => timeRemaining - 1);
      }
    }, 1000);
  }
  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
