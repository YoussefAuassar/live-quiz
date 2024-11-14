import React, { useState, useEffect, useRef } from "react";
import "../styles/QuizPage.css";

function QuizPage() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timer, setTimer] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const audioRef = useRef(null); 

  const soundtracks = [
    { id: 1, src: "/assets/harry.mp3", answer: "harry" },
    { id: 2, src: "/assets/hobbit.mp3", answer: "hobbit" },
    { id: 3, src: "/assets/gladiator.mp3", answer: "gladiator" },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }

    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestion, timer]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === soundtracks[currentQuestion - 1].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < soundtracks.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(20);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      alert("Quiz finished! Your score: " + score);
    }
  };

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <p className="quiz-total">
          <span className="current-question">{currentQuestion}</span>/<span className="total-questions">{soundtracks.length}</span>
        </p>
        <p className="quiz-score">Score: <br /> {score}</p>
      </header>

      <div className="quiz-content">
        <div className="quiz-timer">
          <div className="timer-bar" style={{ width: `${(timer / 20) * 100}%` }}></div>
        </div>

        <h1>Which movie is it?</h1>
        <p className="quiz-prompt">Click on the poster to answer!</p>

        <audio ref={audioRef} src={soundtracks[currentQuestion - 1].src} style={{ display: 'none' }} />

        <div className="quiz-posters">
          <img
            src="/assets/harry-potter.jpg"
            alt="Harry Potter"
            className="poster"
            onClick={() => handleAnswer("harry")}
          />
          <img
            src="/assets/hobbit.jpg"
            alt="Hobbit"
            className="poster"
            onClick={() => handleAnswer("hobbit")}
          />
          <img
            src="/assets/gladiator.jpg"
            alt="Gladiator"
            className="poster"
            onClick={() => handleAnswer("gladiator")}
          />
        </div>

        <button className="quiz-skip-button" onClick={() => handleAnswer(null)}>Skip</button>
      </div>
    </div>
  );
}

export default QuizPage;
