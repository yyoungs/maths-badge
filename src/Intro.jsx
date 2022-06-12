import { React, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Text = styled.p`
  font-size: calc(100px + 2vmin);
`;

function Intro({ onDone: done }) {
  const [index, setIndex] = useState(0);

  const messages = ['Ready', 'Steady', 'Go!'];

  useEffect(() => {
    if (index === messages.length) {
      done();
    }
    setInterval(() => setIndex(index + 1), 1000);
  });

  return <Text>{messages[index]}</Text>;
}

Intro.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default Intro;
