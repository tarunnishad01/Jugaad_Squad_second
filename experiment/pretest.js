/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

/////////////// Write the MCQ below in the exactly same described format ///////////////

  const myQuestions = [
  {
    question: "1. How many phase states are there in QPSK modulation?",
    answers: {
      a: "2",
      b: "4",
      c: "8",
      d: "16"
    },
    correctAnswer: "b"
  },

  {
    question: "2. What does 'M' represent in M-ary PSK?",
    answers: {
      a: "Phase angle",
      b: "Number of frequencies",
      c: "Modulation rate",
      d: "Number of phase states"
    },
    correctAnswer: "d"
  },

  {
    question: "3. What is the full form of BER?",
    answers: {
      a: "Bit Error Rate",
      b: "Binary Energy Ratio",
      c: "Baseband Error Ratio",
      d: "Bandwidth Error Rating"
    },
    correctAnswer: "a"
  },

  {
    question: "4. What is the main advantage of QPSK?",
    answers: {
      a: "Lower data rate",
      b: "Better spectral efficiency",
      c: "Requires less bandwidth",
      d: "Works only on analog signals"
    },
    correctAnswer: "b"
  },

  {
    question: "5. Which factor does NOT affect BER?",
    answers: {
      a: "Signal power",
      b: "Noise",
      c: "Modulation scheme",
      d: "Register length"
    },
    correctAnswer: "d"
  }
];


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
