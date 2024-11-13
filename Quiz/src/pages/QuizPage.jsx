import React from "react";
import "../styles/QuizPage.css"; // You can create a new CSS file for the quiz page

function QuizPage() {
  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <p className="quiz-total">1 of 12 Questions</p>
      </header>

      <div className="quiz-content">
        <div className="quiz-info">
          <p className="quiz-score">Score: 0</p>
          <div className="quiz-sound-icon">
            <i className="fas fa-volume-up"></i> {/* You can use Font Awesome or any other icon */}
          </div>
          <div className="quiz-timer">
            <span>00:30</span> {/* Timer */}
          </div>
        </div>

        <h1>Which movie is it?</h1>
        <p className="quiz-prompt">Click on the poster to answer!</p>

        <div className="quiz-posters">
          <img src="/src/assets/harry-potter.jpg" alt="Movie 1" className="poster" />
          <img src="/src/assets/hobbit.jpg" alt="Movie 2" className="poster" />
          <img src="/src/assets/gladiator.jpg" alt="Movie 3" className="poster" />
        </div>

        <button className="quiz-skip-button">Skip</button>
      </div>
    </div>
  );
}

export default QuizPage;
