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
      question: "1. QPSK मॉड्यूलेशन में कितने फेज स्टेट्स होते हैं?",
      answers: {
        a: "2",
        b: "4",
        c: "8",
        d: "16"
      },
      correctAnswer: "b"
    },

    {
      question: "2. M-ary PSK में 'M' का क्या अर्थ होता है?",
      answers: {
        a: "फेज एंगल",
        b: "फ्रिक्वेंसी की संख्या",
        c: "मॉड्यूलेशन की दर",
        d: "फेज स्टेट्स की संख्या"
      },
      correctAnswer: "d"
    },

    {
      question: "3. BER का पूर्ण रूप क्या है?",
      answers: {
        a: "Bit Error Rate",
        b: "Binary Energy Ratio",
        c: "Baseband Error Ratio",
        d: "Bandwidth Error Rating"
      },
      correctAnswer: "a"
    },

    {
      question: "4. QPSK का मुख्य लाभ क्या है?",
      answers: {
        a: "कम डेटा रेट",
        b: "बेहतर स्पेक्ट्रल एफिशिएंसी",
        c: "कम बैंडविड्थ की आवश्यकता",
        d: "सिर्फ एनालॉग सिग्नल पर काम करता है"
      },
      correctAnswer: "b"
    },

    {
      question: "5. कौन सा कारक BER को प्रभावित नहीं करता है?",
      answers: {
        a: "सिग्नल पावर",
        b: "नॉइज़",
        c: "मॉड्यूलेशन स्कीम",
        d: "रजिस्टर की लंबाई"
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
