import React, { useState, useEffect, useRef } from "react";
import "../styles/QuizPage.css";

function QuizPage() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timer, setTimer] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const audioRef = useRef(null); // Reference to the audio element

  // Example soundtracks
  const soundtracks = [
    { id: 1, src: "/assets/harry.mp3", answer: "harry" },
    { id: 2, src: "/assets/hobbit.mp3", answer: "hobbit" },
    { id: 3, src: "/assets/gladiator.mp3", answer: "gladiator" },
  ];

  useEffect(() => {
    // Play the audio automatically when the component mounts or the question changes
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }

    // Timer countdown
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
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
      setTimer(30);
      // Pause and reset the audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      alert("Quiz finished! Your score: " + score);
    }
  };

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <p className="quiz-total">{currentQuestion} of {soundtracks.length} Questions</p>
      </header>

      <div className="quiz-content">
        <div className="quiz-info">
          <p className="quiz-score">Score: {score}</p>
          <div className="quiz-timer">
            <span>{timer.toString().padStart(2, "0")}:00</span>
          </div>
        </div>

        <h1>Which movie is it?</h1>
        <p className="quiz-prompt">Click on the poster to answer!</p>

        {/* Audio Element for the soundtrack */}
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
