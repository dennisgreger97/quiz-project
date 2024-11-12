const readlineSync = require("readline-sync");

// Task 1: Klasse erstellen
class Question {
  constructor(text, options, correctAnswer, points) {
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
    this.points = points;
  }

  // 1. Methode: display questions and its options
  displayQuestion() {
    console.log(this.text);
    this.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }

  // 2. Methode: check if the users choice is correct
  checkAnswer(userAnswer) {
    return this.options[userAnswer - 1] === this.correctAnswer;
  }
}

// Task 2: instances of the question class
const questions = [
  new Question(
    "Was ist der Standardwert für eine nicht definierte Variable in JavaScript?",
    ["null", "0", "undefined"],
    "undefined",
    10
  ),
  new Question(
    "Welche Methode wird verwendet, um ein Element am Ende eines Arrays hinzuzufügen?",
    ["push()", "add()", "insert()"],
    "push()",
    10
  ),
  new Question(
    "Welche Ausgabe ergibt typeof null in JavaScript?",
    ["object", "null", "undefined"],
    "object",
    10
  ),
  new Question(
    "Wie kann man den Typ einer Variable in JavaScript überprüfen?",
    ["typeOf", "typeof", "checkType"],
    "typeof",
    10
  ),
  new Question(
    "Wie kann man eine Schleife abbrechen, sobald eine Bedingung erfüllt ist?",
    ["stop", "exit", "break"],
    "break",
    10
  ),
  new Question(
    "Welcher Operator wird verwendet, um Gleichheit ohne Typumwandlung zu prüfen?",
    ["==", "===", "!="],
    "===",
    10
  ),
  new Question(
    "Wie kann man eine Funktion in JavaScript deklarieren?",
    ["function myFunction() {}", "def myFunction()", "func myFunction()"],
    "function myFunction() {}",
    10
  ),
  new Question(
    "Welches Schlüsselwort wird verwendet, um eine Variable zu deklarieren, die ihren Wert ändern kann?",
    ["const", "var", "static"],
    "var",
    10
  ),
  new Question(
    "Was ist der Wert von 2 + '2' in JavaScript?",
    ["4", "22", "undefined"],
    "22",
    10
  ),
  new Question(
    "Wie nennt man die Technik, bei der eine Funktion auf sich selbst verweist und erneut aufruft?",
    ["Referenzierung", "Rekursion", "Reiteration"],
    "Rekursion",
    10
  ),
];

// Task 3: answer the questions
function startQuiz(questions, timeLimit = 100) {
  let score = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;

  const startTime = Date.now();

  for (const question of questions) {
    const elapsed = (Date.now() - startTime) / 1000;

    if (elapsed >= timeLimit) {
      console.log(`\nZeit ist abgelaufen!`);
      unansweredQuestions +=
        questions.length -
        (correctAnswers + incorrectAnswers + unansweredQuestions);
      break;
    }

    question.displayQuestion();
    const remainingTime = timeLimit - elapsed;
    console.log(`Restzeit: ${remainingTime.toFixed(2)} Sekunden`);

    const userAnswer = readlineSync.questionInt(
      `Bitte Nummer der Antwort angeben: `
    );

    if (question.checkAnswer(userAnswer)) {
      console.log("Richtig!");
      score += question.points;
      correctAnswers++;
    } else {
      console.log("Falsch!");
      incorrectAnswers++;
    }

    console.log("-----------------------------");
  }

  // Restzeit berechnen und anzeigen
  const totalElapsed = (Date.now() - startTime) / 1000;
  const remainingTimeAtEnd = timeLimit - totalElapsed;

  // Task 4: display the results
  console.log(`\nQuiz beendet!`);
  console.log(`Richtige Antworten: ${correctAnswers}`);
  console.log(`Falsche Antworten: ${incorrectAnswers}`);
  console.log(`Nicht beantwortet: ${unansweredQuestions}`);
  console.log(`Gesamtpunktzahl: ${score}`);
  console.log(
    `Restzeit am Ende: ${Math.max(0, remainingTimeAtEnd.toFixed(2))} Sekunden`
  );
}

// Quiz starten
startQuiz(questions, 30);
