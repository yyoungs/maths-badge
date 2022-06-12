import { React, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSound from 'use-sound';

import pop from './pop-up-off.mp3';

const Wrapper = styled.span`
  width: '100%';
  textalign: 'left';
  @media (max-width: 768px) {
    text-align: center;
  }
  & > input {
    font-size: 100px;
    width: 230px;
  }
`;

/**
 * Text box answer component with input validation
 * and sound on submit
 */
function Answer({ onAnswer: answerQuestion }) {
  const [answer, setAnswer] = useState('');
  const [playSubmit] = useSound(pop, { volume: 0.1 });

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      playSubmit();
      setAnswer('');
      answerQuestion(event.target.value);
    } else if (!/[0-9,-]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <Wrapper>
      <input
        type="tel"
        name="answer"
        maxLength="4"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus="true"
        autoComplete="off"
        inputMode="numeric"
        pattern="[0-9,-]*"
        value={answer}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        noValidate
      />
    </Wrapper>
  );
}

Answer.propTypes = {
  onAnswer: PropTypes.PropTypes.func.isRequired,
};

export default Answer;
