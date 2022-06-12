import {
  faCheck,
  faRotateLeft,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';

import failSound from './ow.mp3';
import passSound from './tada.mp3';

import Button from './Button';

const Header = styled.header`
  font-size: calc(100px + 2vmin);
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  @media (max-width: 768px) {
    grid-template-columns: auto auto auto;
  }
  @media (max-width: 480px) {
    grid-template-columns: auto auto;
  }
`;

/**
 * Renders a grid of questions results
 */
function Score({
  questions,
  onDone: handleDoneClick,
  onAgain: handleAgainClick,
}) {
  const [playPass] = useSound(passSound, { volume: 0.5 });
  const [playFail] = useSound(failSound, { volume: 0.5 });

  const score = questions.reduce(
    (acc, curr) => (curr.givenAnser === curr.correctAnswer ? acc + 1 : acc),
    0
  );

  const answer = (question) =>
    question.givenAnser === question.correctAnswer ? (
      <span>
        <FontAwesomeIcon
          icon={faCheck}
          style={{ color: 'green', marginRight: '8px' }}
        />
      </span>
    ) : (
      <>
        <span>
          <FontAwesomeIcon
            icon={faXmark}
            style={{ color: 'red', marginRight: '8px' }}
          />
        </span>
        <span style={{ color: 'grey' }}>{question.correctAnswer}</span>
      </>
    );

  const gridItems = questions.map((q, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={i}>
      <p>
        {q.text} ={q.givenAnser} {answer(q)}
      </p>
    </li>
  ));

  const examPassed = score === questions.length;
  if (examPassed) {
    playPass();
  } else {
    playFail();
  }

  return (
    <div style={{ width: '100%' }}>
      {examPassed && <Confetti />}
      <Header>
        Score {score}/{questions.length}
      </Header>
      <Grid>{gridItems}</Grid>
      <ButtonGroup>
        <Button onClick={handleAgainClick}>
          <FontAwesomeIcon icon={faRotateLeft} />
          Again
        </Button>
        <Button onClick={handleDoneClick}>
          <FontAwesomeIcon icon={faCheck} />
          Done
        </Button>
      </ButtonGroup>
    </div>
  );
}

Score.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      correctAnswer: PropTypes.string,
      givenAnser: PropTypes.string,
    })
  ).isRequired,
  onDone: PropTypes.func.isRequired,
  onAgain: PropTypes.func.isRequired,
};

export default Score;
