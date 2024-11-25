// Handle quiz submission and level progression
function handleQuizSubmit(level, nextLevel) {
    const answers = {
      easy: {
        question1: 'A',
        question2: 'B',
        question3: 'B'
      },
      medium: {
        question1: 'A',
        question2: 'A',
        question3: 'A'
      },
      hard: {
        question1: 'A',
        question2: 'A',
        question3: 'A'
      }
    };
  
    let score = 0;
    const userAnswers = {};
  
    // Collect user answers for the current level
    for (let i = 1; i <= 3; i++) {
      const answer = document.querySelector(`input[name="question${i}"]:checked`)?.value;
      if (answer) {
        userAnswers[`question${i}`] = answer;
      }
    }
  
    // Calculate score
    for (let question in answers[level]) {
      if (userAnswers[question] === answers[level][question]) {
        score++;
      }
    }
  
    // Save score to localStorage
    localStorage.setItem('score', score);
  
    // Redirect to the next level if score >= 3, else show an alert
    if (score >= 3 && nextLevel) {
      window.location.href = nextLevel;
    } else {
      alert(`Your score is: ${score}. Try again!`);
    }
  }
  
  // Add event listener for submit button (easy, medium, hard levels)
  document.querySelector('.submit-btn')?.addEventListener('click', function () {
    if (window.location.pathname.includes('easy.html')) {
      handleQuizSubmit('easy', 'medium.html');
    } else if (window.location.pathname.includes('medium.html')) {
      handleQuizSubmit('medium', 'hard.html');
    } else if (window.location.pathname.includes('hard.html')) {
      handleQuizSubmit('hard', 'congratulations.html');
    }
  });
  
  // Dynamically load questions based on the level
  function loadQuestions(level) {
    const questions = {
      easy: [
        { question: 'What does "SDG" stand for?', options: ['Sustainable Development Goals', 'Social Development Guidelines', 'Standard Development Goals'], correct: 'A' },
        { question: 'What is the main goal of SDG 4?', options: ['End hunger', 'Quality Education for all', 'Combat climate change'], correct: 'B' },
        { question: 'Which of the following is a key SDG target?', options: ['Gender Equality', 'Reduce pollution', 'End conflicts'], correct: 'B' }
      ],
      medium: [
        { question: 'Which SDG is related to water and sanitation?', options: ['SDG 6', 'SDG 2', 'SDG 3'], correct: 'A' },
        { question: 'SDG 13 aims to address which global challenge?', options: ['Climate change', 'Hunger', 'Health'], correct: 'A' },
        { question: 'What is SDG 5 focused on?', options: ['Gender Equality', 'Clean Energy', 'Quality Jobs'], correct: 'A' }
      ],
      hard: [
        { question: 'Which is a global initiative to promote SDG 4?', options: ['Education for All', 'Health for All', 'Green Economy'], correct: 'A' },
        { question: 'How many targets does SDG 14 (Life below Water) have?', options: ['10', '7', '5'], correct: 'A' },
        { question: 'Which is the SDG that directly addresses inequalities?', options: ['SDG 10', 'SDG 9', 'SDG 7'], correct: 'A' }
      ]
    };
  
    const questionContainer = document.getElementById('questions-container');
    questionContainer.innerHTML = ''; // Clear previous questions
  
    questions[level].forEach((item, index) => {
      const questionHTML = `
        <div class="question">
          <p>${index + 1}. ${item.question}</p>
          <div class="option">
            <input type="radio" name="question${index + 1}" value="A">
            <label for="option1">${item.options[0]}</label>
          </div>
          <div class="option">
            <input type="radio" name="question${index + 1}" value="B">
            <label for="option2">${item.options[1]}</label>
          </div>
          <div class="option">
            <input type="radio" name="question${index + 1}" value="C">
            <label for="option3">${item.options[2]}</label>
          </div>
        </div>
      `;
      questionContainer.innerHTML += questionHTML;
    });
  }
  
  // Call this function to load the questions based on the current level
  if (window.location.pathname.includes('easy.html')) {
    loadQuestions('easy');
  } else if (window.location.pathname.includes('medium.html')) {
    loadQuestions('medium');
  } else if (window.location.pathname.includes('hard.html')) {
    loadQuestions('hard');
  }
  