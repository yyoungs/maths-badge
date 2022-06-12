import { React, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { PropTypes } from 'prop-types';

const wipeInRight = keyframes`
from {
  clip-path: inset(0 100% 0 0);
}
to {
  clip-path: inset(0 0 0 0);
}
`;

const wipeOutRight = keyframes`
from {
  clip-path: inset(0 0 0 0);
}
to {
  clip-path: inset(0 0 0 100%);
}
`;

const animationMixin = css`
  animation: ${(props) =>
    css`0.5s cubic-bezier(0.25, 1, 0.3, 1) ${
      props.visible ? wipeInRight : wipeOutRight
    } both`};
`;

const AnimatedText = styled.div`
  ${(props) => (props.mounted && props.visible !== null ? animationMixin : '')}
  text-align: right;
  white-space: nowrap;
  width: 100%;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

/**
 * A div containting the quetion text that animates to
 * make it clear the questions has changed.
 */
function Question({ question: nextQuestion }) {
  const [visible, setVisible] = useState(null);
  const [question, setQuestion] = useState(nextQuestion);

  const useDidMountWithoutRender = (func, deps) => {
    const didMount = useRef(null);

    useEffect(() => {
      if (didMount.current) {
        return func();
      }
      didMount.current = true;
      return undefined;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return didMount.current;
  };

  const mounted = useDidMountWithoutRender(() => {
    setVisible(false);
    const timer = setTimeout(() => {
      setQuestion(nextQuestion);
      setVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [nextQuestion]);

  return (
    <AnimatedText visible={visible} mounted={mounted}>
      {question}
    </AnimatedText>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Question;
