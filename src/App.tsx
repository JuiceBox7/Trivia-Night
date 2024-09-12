import React, { useState } from "react";
import "./App.css";

// --- Constants & Globals ---
const correct = "Correct!";
const incorrect = "Incorrect!";
export let res = "";

// --- React Functions ---
function Answer({
  value,
  name,
  onAnswerSelect,
}: {
  value: string;
  name: string;
  onAnswerSelect: React.MouseEventHandler;
}) {
  return (
    <button className={name} onClick={onAnswerSelect}>
      {value}
    </button>
  );
}

function Question({ value }: { value: string }) {
  return (
    <div className="message-container">
      <h2>{value}</h2>
    </div>
  );
}

function Result({ value }: { value: string }) {
  const className = value === correct ? "correct" : "incorrect";
  return <h2 className={className}>{value}</h2>;
}

function Choices({
  choices,
  answerClass,
  onChoiceSelect,
}: {
  choices: string[];
  answerClass: string;
  onChoiceSelect: any;
}) {
  function handleClick(i: number) {
    onChoiceSelect(choices[i]);
  }

  return (
    <>
      <div className="button-container">
        <Answer
          value={choices[0]}
          name={answerClass}
          onAnswerSelect={() => handleClick(0)}
        />
        <Answer
          value={choices[1]}
          name={answerClass}
          onAnswerSelect={() => handleClick(1)}
        />
        <Answer
          value={choices[2]}
          name={answerClass}
          onAnswerSelect={() => handleClick(2)}
        />
        <Answer
          value={choices[3]}
          name={answerClass}
          onAnswerSelect={() => handleClick(3)}
        />
      </div>
    </>
  );
}

function Next({ isDisabled, onNext }: { isDisabled: boolean; onNext: any }) {
  const className = isDisabled ? "next-disabled" : "";
  return (
    <div className="button-container">
      <button className={className} disabled={isDisabled} onClick={onNext}>
        Next
      </button>
    </div>
  );
}

function getQuestion(i: number): string {
  const questions = ["can ducks fly", "this is a test"];
  return questions[i];
}

function getChoices(question: string): string[] {
  const choices: { [key: string]: string[] } = {
    "can ducks fly": [
      "lmao yeah",
      "nah man, they eat too much bread",
      "Keep dreaming buddy",
      "yes, but it's actually a mutation and is super rare but no yeah totally it could happen",
    ],
    "this is a test": ["for sure", "got it", "oh i see", "word"],
  };
  return choices[question];
}

function getAnswer(question: string) {
  const answers: { [key: string]: string } = {
    "can ducks fly": "lmao yeah",
    "this is a test": "word",
  };
  return answers[question];
}

function App() {
  const [questionNum, setquestionNum] = useState(0);
  const [question, setQuestion] = useState(() => getQuestion(0));
  const [choices, setChoices] = useState(() => getChoices(question));
  const [answer, setAnswer] = useState(() => getAnswer(question));
  const [res, setRes] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [answerClass, setAnswerClass] = useState("");

  function goNext() {
    setquestionNum(questionNum + 1);
    const nextQuestion = getQuestion(questionNum + 1);
    const nextChoices = getChoices(nextQuestion);
    const nextAnswer = getAnswer(nextQuestion);
    setQuestion(nextQuestion);
    setChoices(nextChoices);
    setAnswer(nextAnswer);
    setRes("");
    setIsDisabled(true);
    setAnswerClass("");
  }

  function handlePlay(choice: string) {
    if (choice === answer) {
      setRes(correct);
      setIsDisabled(false);
      setAnswerClass("answer-disabled");
    } else setRes(incorrect);
  }

  return (
    <>
      <div className="title">
        <h3>Trivia Night</h3>
      </div>
      <div className="container">
        <Result value={res} />
        <h2>{"Question " + (questionNum + 1)}</h2>
        <Question value={question + "?"} />
        <Choices
          choices={choices}
          answerClass={answerClass}
          onChoiceSelect={handlePlay}
        />
        <br />
        <Next isDisabled={isDisabled} onNext={goNext} />
      </div>
    </>
  );
}

export default App;
