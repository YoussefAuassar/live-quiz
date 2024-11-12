import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <Header />
      <p>Guess the movie by the music! Listen to <br /> the soundtrack and identify the movie.</p>
      <Button label="Take the Quiz" />
    </div>
  );
}

export default HomePage;
