import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/QuizPage.css";
import quizData from "../components/quizData";

function QuizPage() {
  // State variabelen voor score, huidige vraag, timer, geselecteerd antwoord, en animatie toestand
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timer, setTimer] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswerAnimation, setShowCorrectAnswerAnimation] = useState(false);
  const [showWrongAnswerAnimation, setShowWrongAnswerAnimation] = useState(false);
  
  // Referenties voor het geluid en de animatie
  const audioRef = useRef(null);
  const correctAnimationRef = useRef(null); 
  const wrongAnimationRef = useRef(null);

  // Effect om animaties uit te voeren bij correct of fout antwoord
  useEffect(() => {
    if (showCorrectAnswerAnimation && correctAnimationRef.current) {
      // Animatie voor een correct antwoord
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
    }

    if (showWrongAnswerAnimation && wrongAnimationRef.current) {
      // Animatie voor een fout antwoord
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

  // Effect om de timer te starten en het geluid af te spelen bij elke nieuwe vraag
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }

    // Timer countdown voor elke vraag
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(countdown); // Opruimen van de timer bij het verlaten van de component
  }, [currentQuestion, timer]);

  // Functie om een antwoord te verwerken
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = quizData[currentQuestion - 1].answer;
    
    // Als het antwoord correct is, verhoog de score en toon de animatie
    if (answer === correctAnswer) {
      setScore(score + 1);
      setShowCorrectAnswerAnimation(true);
    } else {
      // Als het antwoord fout is, toon de fout animatie
      setShowWrongAnswerAnimation(true);
    }

    // Na een korte pauze, ga naar de volgende vraag of eindig het quizspel
    if (currentQuestion < quizData.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(20);  // Reset de timer voor de volgende vraag
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }, 2000);
    } else {
      setTimeout(() => {
        alert("Quiz finished! Your score: " + score);
      }, 2000);
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
              onClick={() => handleAnswer(poster.value)} // Klikken op poster om antwoord te geven
            />
          ))}
        </div>

        <button className="quiz-skip-button" onClick={() => handleAnswer(null)}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
