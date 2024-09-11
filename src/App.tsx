import { useState } from "react";
import "./App.css";
import notify, { answerSelected } from "./events.ts";

// --- Constants & Globals ---
const correct = "Correct!";
const incorrect = "Incorrect!";
export let res = "";

// --- React Functions ---
function Answer({
  value,
  onAnswerSelect,
}: {
  value: string;
  onAnswerSelect: React.MouseEventHandler;
}) {
  return (
    <button className="answer" onClick={onAnswerSelect}>
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
  onChoiceSelect,
}: {
  choices: string[];
  onChoiceSelect: any;
}) {
  function handleClick(i: number) {
    onChoiceSelect(choices[i]);
  }

  return (
    <>
      <div className="button-container">
        <Answer value={choices[0]} onAnswerSelect={() => handleClick(0)} />
        <Answer value={choices[1]} onAnswerSelect={() => handleClick(1)} />
        <Answer value={choices[2]} onAnswerSelect={() => handleClick(2)} />
        <Answer value={choices[3]} onAnswerSelect={() => handleClick(3)} />
      </div>
    </>
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

  function handlePlay(choice: string) {
    res = choice === answer ? correct : incorrect;
    if (res === correct) {
    }
    notify(answerSelected);
    setquestionNum(questionNum + 1);
    if (questionNum >= 2) return;
    const nextQuestion = getQuestion(questionNum);
    const nextChoices = getChoices(nextQuestion);
    const nextAnswer = getAnswer(nextQuestion);
    setQuestion(nextQuestion);
    setChoices(nextChoices);
    setAnswer(nextAnswer);
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
        <Choices choices={choices} onChoiceSelect={handlePlay} />
      </div>
    </>
  );
}

export default App;
