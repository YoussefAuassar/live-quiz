import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="overlay"></div>
      <h2>
        Movie Music <br /> Quiz.
      </h2>
      <p>
        Guess the movie by the music! Try to<br /> 
        identify the movie by the music
      </p>
   
      <Link to="/quiz">
        <button className="quiz-button">
          Take the Quiz
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
