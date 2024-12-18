import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/QuizPage.css";
import quizData from "../components/quizData";
import ExplosionEffect from "../components/ExplosionEffect";

function QuizPage() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timer, setTimer] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswerAnimation, setShowCorrectAnswerAnimation] = useState(false);
  const [showWrongAnswerAnimation, setShowWrongAnswerAnimation] = useState(false);
  const [triggerExplosion, setTriggerExplosion] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  const audioRef = useRef(null);
  const correctAnimationRef = useRef(null);
  const wrongAnimationRef = useRef(null);

  useEffect(() => {
    if (showCorrectAnswerAnimation && correctAnimationRef.current) {
      gsap.fromTo(
        correctAnimationRef.current,
        { opacity: 0, scale: 0.5, y: -50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)" }
      );
      gsap.to(correctAnimationRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1.5,
        onComplete: () => setShowCorrectAnswerAnimation(false),
      });
      setTriggerExplosion(true);
    }

    if (showWrongAnswerAnimation && wrongAnimationRef.current) {
      gsap.fromTo(
        wrongAnimationRef.current,
        { opacity: 0, scale: 1.5, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.in" }
      );
      gsap.to(wrongAnimationRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1,
        onComplete: () => setShowWrongAnswerAnimation(false),
      });
    }
  }, [showCorrectAnswerAnimation, showWrongAnswerAnimation]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }

    const countdown = setInterval(() => {
      if (timer > 0 && !quizEnded) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    if (timer === 0) {
      handleAnswer(null);
    }

    return () => clearInterval(countdown);
  }, [currentQuestion, timer, quizEnded]);

  const handleAnswer = (answer) => {
    if (answer !== null) {
      setSelectedAnswer(answer);
      const correctAnswer = quizData[currentQuestion - 1].answer;

      if (answer === correctAnswer) {
        setScore(score + 1);
        setShowCorrectAnswerAnimation(true);
      } else {
        setShowWrongAnswerAnimation(true);
      }
    }

    if (currentQuestion < quizData.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(20);
        setSelectedAnswer(null);
        setShowCorrectAnswerAnimation(false);
        setShowWrongAnswerAnimation(false);
        setTriggerExplosion(false);
      }, 2000);
    } else {
      setQuizEnded(true);
      setTimeout(() => {
        alert("Quiz finished! Your score: " + score);
      }, 2000);
    }
  };

  const handleSkip = () => {
    setSelectedAnswer(null);
    setShowCorrectAnswerAnimation(false);
    setShowWrongAnswerAnimation(false);
    setTriggerExplosion(false);
  
    if (currentQuestion < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(20);
    } else {
      setQuizEnded(true);
      setTimeout(() => alert("Quiz finished! Your score: " + score), 500);
    }
  };

  return (
    <div className="quiz-page">
      {showCorrectAnswerAnimation && (
        <div ref={correctAnimationRef} className="correct-answer-animation">
          Congratulations! You guessed it right!
        </div>
      )}

      {showWrongAnswerAnimation && (
        <div ref={wrongAnimationRef} className="wrong-answer-animation">
          Oops! That's not correct.
        </div>
      )}

      <header className="quiz-header">
        <p className="quiz-total">
          <span className="current-question">{currentQuestion}</span>/
          <span className="total-questions">{quizData.length}</span>
        </p>
        <p className="quiz-score">
          Score: <br /> {score}
        </p>
      </header>

      <div className="quiz-content">
        <div className="quiz-timer">
          <div
            className="timer-bar"
            style={{ width: `${(timer / 20) * 100}%` }}
          ></div>
        </div>

        <h1>Which movie is it?</h1>
        <p className="quiz-prompt">Click on the poster to answer!</p>

        <audio
          ref={audioRef}
          src={quizData[currentQuestion - 1].soundtrackSrc}
          style={{ display: "none" }}
        />

        <div className="quiz-posters">
          {quizData[currentQuestion - 1].posters.map((poster, index) => (
            <img
              key={index}
              src={poster.src}
              alt={poster.alt}
              className="poster"
              onClick={() => handleAnswer(poster.value)}
            />
          ))}
        </div>

        <button className="quiz-skip-button" onClick={handleSkip}>
          Skip
        </button>
      </div>

      <ExplosionEffect trigger={triggerExplosion} />
    </div>
  );
}

export default QuizPage;
