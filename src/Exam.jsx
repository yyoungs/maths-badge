import {
  faPersonRunning,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import { React, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Answer from './Answer';
import { badgeShape } from './badges';
import Button from './Button';
import createExam from './examGenerator';
import ProgressBar from './ProgressBar';
import Question from './Question';

const QuestionRow = styled.div`
  font-size: 7rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10vh;
  @media (max-width: 768px) {
    margin-bottom: 5vh;
    flex-direction: column;
    gap: 0;
  }
`;

const Equals = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 690px;
  height: 40px;
  align-items: center;
`;

/**
 * Exam component renders the question text and answer input
 */
function Exam({
  onDone: done,
  onClose: handleClose,
  badge: { count, questionTypes, timeLimit },
}) {
  const [duration] = useState(() => {
    const now = DateTime.utc();
    return {
      start: now,
      end: now.plus({ minutes: timeLimit }),
      warning: now.plus({ minutes: timeLimit }).minus({ seconds: 20 }),
    };
  });
  const [time, setTime] = useState({ progress: 0, warning: false });
  const [exam, setExam] = useState(() => ({
    currentQuestion: 0,
    questions: createExam(count, questionTypes),
  }));

  const checkTime = () => {
    const now = DateTime.utc();
    if (duration.end <= now) {
      done(exam.questions);
    } else {
      const fullDuration = duration.end.diff(duration.start).toObject();
      const currentDuration = now.diff(duration.start).toObject();
      const progress =
        currentDuration.milliseconds / (fullDuration.milliseconds / 100);
      const warning = now >= duration.warning;
      setTime({ progress, warning });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => checkTime(), 1000);
    return () => clearInterval(timer);
  });

  const progress = (e) => e.currentQuestion / (e.questions.length / 100);
  const progressText = (e) => `${e.currentQuestion}/${e.questions.length}`;

  const handleAnswer = (answer) => {
    setExam((e) => {
      const questions = [...exam.questions];
      questions[e.currentQuestion].givenAnser = answer;
      const currentQuestion = e.currentQuestion + 1;
      const newExam = {
        questions,
        currentQuestion,
      };
      if (currentQuestion === e.questions.length) {
        done(questions);
      }
      return newExam;
    });
  };

  return (
    <>
      <QuestionRow>
        <Question question={exam.questions[exam.currentQuestion].text} />
        <Equals> = </Equals>
        <Answer onAnswer={handleAnswer} />
      </QuestionRow>
      <Progress>
        <span style={{ width: 60 }}>{progressText(exam)}</span>
        <ProgressBar bgcolor="#04AA6D" completed={progress(exam)} />
      </Progress>
      <Progress>
        <span style={{ width: 60 }}>
          <FontAwesomeIcon
            icon={faStopwatch}
            shake={time.warning}
            color={time.warning ? 'orange' : 'inherit'}
          />
        </span>
        <ProgressBar bgcolor="#00ccff" completed={time.progress} />
      </Progress>
      <Button onClick={handleClose} style={{ marginTop: '15vh' }}>
        <FontAwesomeIcon icon={faPersonRunning} />
        Run Away
      </Button>
    </>
  );
}

Exam.propTypes = {
  onDone: PropTypes.PropTypes.func.isRequired,
  onClose: PropTypes.PropTypes.func.isRequired,
  badge: PropTypes.PropTypes.shape(badgeShape).isRequired,
};

export default Exam;
