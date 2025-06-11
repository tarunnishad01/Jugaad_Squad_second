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
      } else {
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
      question: "What does QPSK stand for in digital modulation?",  
      answers: {
        a: "Quadrature Phase Shift Keying",
        b: "Quick Phase Shift Keying",
        c: "Quantum Phase Signal Keying",
        d: "Quadratic Phase Sequence Keying"
      },
      correctAnswer: "a"
    },

    {
      question: "How many distinct phase states are used in QPSK modulation?",  
      answers: {
        a: "2",
        b: "4",
        c: "8",
        d: "16"
      },
      correctAnswer: "b"
    },

    {
      question: "In M-ary PSK, what does the 'M' denote?",  
      answers: {
        a: "Modulation index",
        b: "Number of frequencies",
        c: "Number of phase states",
        d: "Memory of the signal"
      },
      correctAnswer: "c"
    },

    {
      question: "What does BER stand for in digital communication?",  
      answers: {
        a: "Bit Error Ratio",
        b: "Bandwidth Efficiency Rate",
        c: "Binary Encoding Rate",
        d: "Baseband Emission Result"
      },
      correctAnswer: "a"
    },

    {
      question: "Which of the following factors does NOT affect the BER performance of a digital modulation scheme?",  
      answers: {
        a: "Noise in the channel",
        b: "Modulation type",
        c: "Antenna shape",
        d: "Signal power"
      },
      correctAnswer: "c"
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
