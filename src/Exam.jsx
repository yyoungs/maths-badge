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

const useExamState = ({ count, questionTypes, timeLimit }, done) => {
  // Use lazy load set the initial duration data once
  const [duration] = useState(() => {
    const now = DateTime.utc();
    return {
      start: now,
      end: now.plus({ minutes: timeLimit }),
      warning: now.plus({ minutes: timeLimit }).minus({ seconds: 20 }),
    };
  });
  const [time, setTime] = useState({ value: 0, warning: false });
  // Use lazy load to only create the exam once
  const [exam, setExam] = useState(() => ({
    currentQuestion: 0,
    questions: createExam(count, questionTypes),
  }));

  useEffect(() => {
    /**
     * Work out the time progress and if we have hit
     * the warning threashold
     */
    const createTime = (now) => {
      const fullDuration = duration.end.diff(duration.start).toObject();
      const currentDuration = now.diff(duration.start).toObject();
      const value =
        currentDuration.milliseconds / (fullDuration.milliseconds / 100);
      const warning = now >= duration.warning;
      return { value, warning };
    };

    /**
     * Update the time process and finish the exam
     * if we are past the time limit
     */
    const checkTime = () => {
      const now = DateTime.utc();
      if (duration.end <= now) {
        done({ questions: exam.questions });
      } else {
        const newTime = createTime(now);
        setTime(newTime);
      }
    };

    const timer = setInterval(() => checkTime(), 1000);
    return () => clearInterval(timer);
  });

  /**
   * Calculate time taken and call done cb
   */
  const finishExam = (questions) => {
    const now = DateTime.utc();
    const finalDuration = now.diff(duration.start).toFormat("m'm' s's'");
    done({ questions, finalDuration });
  };

  /**
   * Merge the answer into the exam by copying it
   * and updating the values then returning the
   * new instance
   */
  const updateExam = (oldExam, answer) => {
    const questions = [...oldExam.questions];
    questions[exam.currentQuestion].givenAnser = answer;
    const currentQuestion = oldExam.currentQuestion + 1;
    return {
      questions,
      currentQuestion,
    };
  };

  /**
   * Set the answer in state and finish the exam
   * if we have answered all the questions
   */
  const setAnswer = (answer) => {
    setExam((oldExam) => {
      const newExam = updateExam(oldExam, answer);
      if (newExam.currentQuestion === oldExam.questions.length) {
        finishExam(newExam.questions);
      }
      return newExam;
    });
  };

  return { exam, time, setAnswer };
};

/**
 * Exam component renders the question text and answer input
 */
function Exam({ onDone: done, onClose: handleClose, badge }) {
  const { exam, time, setAnswer } = useExamState(badge, done);

  const progress = (e) => e.currentQuestion / (e.questions.length / 100);
  const progressText = (e) => `${e.currentQuestion}/${e.questions.length}`;

  const handleAnswer = (answer) => {
    setAnswer(answer);
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
        <ProgressBar bgcolor="#00ccff" completed={time.value} />
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
