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

function Next({
  isCorrect,
  isDisabled,
  onNext,
}: {
  isCorrect: boolean;
  isDisabled: boolean;
  onNext: any;
}) {
  const className = isDisabled ? "next-disabled" : "";
  const text = isCorrect ? "Next" : "Try Again";
  return (
    <div className="button-container">
      <button className={className} disabled={isDisabled} onClick={onNext}>
        {text}
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
  const [isCorrect, setIsCorrect] = useState(false);

  function setup(question: string, choices: string[], answer: string) {
    setQuestion(question);
    setChoices(choices);
    setAnswer(answer);
    setRes("");
    setIsDisabled(true);
    setAnswerClass("");
    setIsCorrect(false);
  }

  const goNext = () => {
    setquestionNum(questionNum + 1);
    const nextQuestion = getQuestion(questionNum + 1);
    const nextChoices = getChoices(nextQuestion);
    const nextAnswer = getAnswer(nextQuestion);
    setup(nextQuestion, nextChoices, nextAnswer);
  };

  const tryAgain = () => {
    setquestionNum(0);
    const nextQuestion = getQuestion(0);
    const nextChoices = getChoices(nextQuestion);
    const nextAnswer = getAnswer(nextQuestion);
    setup(nextQuestion, nextChoices, nextAnswer);
  };

  function handlePlay(choice: string) {
    if (choice === answer) {
      console.log(correct);
      setRes(correct);
      setIsCorrect(true);
    } else {
      console.log(incorrect);
      setRes(incorrect);
      setIsCorrect(false);
    }
    setIsDisabled(false);
    setAnswerClass("answer-disabled");
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
        <div className="button-container">
          {choices.map((choice) => (
            <Answer
              value={choice}
              name={choice === answer && isCorrect ? "answer-correct" : answerClass}
              onAnswerSelect={() => handlePlay(choice)}
            />
          ))}
        </div>
        <br />
        <Next
          isCorrect={isCorrect}
          isDisabled={isDisabled}
          onNext={isCorrect ? goNext : tryAgain}
        />
      </div>
    </>
  );
}

export default App;
