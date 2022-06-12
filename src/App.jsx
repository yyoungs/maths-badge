import React, { useState } from 'react';
import styled from 'styled-components';

import './App.css';
import { badges } from './badges';
import BadgesList from './BadgeList';
import Exam from './Exam';
import Intro from './Intro';
import Score from './Score';
import Summary from './Summary';

const Wonky = styled.div`
  text-transform: uppercase;
  font-family: 'Comic Sans MS';
  transform: rotate(27deg);
  display: inline-block;
`;

function App() {
  const [state, setState] = useState('home');
  const [badge, setBadge] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleBadgeClick = (index) => {
    setBadge(badges[index]);
    setState('summary');
  };

  const handleSummaryDone = () => {
    setState('intro');
  };

  const handleSummaryClose = () => {
    setState('home');
  };

  const handleIntroDone = () => {
    setState('exam');
  };

  const handleExamDone = (q) => {
    setQuestions(q);
    setState('score');
  };

  const reset = () => {
    setBadge(null);
    setQuestions([]);
    setState('home');
  };

  const handleExamClose = () => {
    reset();
  };

  const handleScoreDone = () => {
    reset();
  };

  const handleAgain = () => {
    setQuestions([]);
    setState('intro');
  };

  const title = () => {
    const text = 'badge';
    return text.split('').map((c, i) => (
      <span key={badges[i].name} style={{ color: badges[i].color }}>
        {c}
      </span>
    ));
  };

  const renderScreens = () => {
    switch (state) {
      case 'intro':
        return <Intro onDone={handleIntroDone} />;
      case 'summary':
        return (
          <Summary
            onDone={handleSummaryDone}
            onClose={handleSummaryClose}
            badge={badge}
          />
        );
      case 'exam':
        return (
          <Exam
            onDone={handleExamDone}
            onClose={handleExamClose}
            badge={badge}
          />
        );
      case 'score':
        return (
          <Score
            onDone={handleScoreDone}
            onAgain={handleAgain}
            questions={questions}
          />
        );
      case 'home':
      default:
        return (
          <>
            <h1 style={{ fontSize: '5em', marginBottom: '.4em' }}>
              <span style={{ fontFamily: 'Courier' }}>maths </span>
              <Wonky>{title()}</Wonky>
            </h1>
            <BadgesList badges={badges} onClick={handleBadgeClick} />
          </>
        );
    }
  };

  return <div className="App">{renderScreens()}</div>;
}

export default App;
