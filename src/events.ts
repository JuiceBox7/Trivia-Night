// --- Event Targets ---
const triviaQuestion = new EventTarget();

// --- Event Names ---
export const answerSelected = "answer-selected"

// --- Event Listeners ---
triviaQuestion.addEventListener(answerSelected, () => {
    
})

// --- Functions ---
export default function notify(name: string) {
    triviaQuestion.dispatchEvent(new Event(name));
}