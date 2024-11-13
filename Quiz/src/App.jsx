import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage'; // Import the QuizPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page route */}
        <Route path="/quiz" element={<QuizPage />} /> {/* Quiz page route */}
      </Routes>
    </Router>
  );
}

export default App;
