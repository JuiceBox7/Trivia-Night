//import { useState } from 'react'
import "./App.css";

function App() {
  return (
    <>
      <div className="title">
        <h3>Trivia Night</h3>
      </div>
      <div className="container">
        <h2>Question 1</h2>
        <div className="message-container">
          <p>How many ducks does it take to fly to the moon?</p>
        </div>
        <div className="button-container">
          <button>1 duck</button>
          <button>2 ducks</button>
          <button>3 ducks</button>
        </div>
      </div>
    </>
  );
}

export default App;
