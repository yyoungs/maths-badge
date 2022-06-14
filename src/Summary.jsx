import {
  faArrowLeft,
  faListCheck,
  faRocket,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { React } from 'react';
import styled from 'styled-components';

import { badgeShape } from './badges';
import Button from './Button';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
`;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  color: ${(props) => props.color || '#fff'};
  font-size: 80px;
`;

/**
 * Renders a summary of the badge details
 */
function Summary({ badge, onClose: handleBackClick, onDone: handleGoClick }) {
  return (
    <Screen>
      <Header color={badge.color}>
        {typeof badge.name === 'function' ? badge.name() : badge.name}
      </Header>
      <p>{badge.desc}</p>
      <p>
        <FontAwesomeIcon icon={faListCheck} style={{ marginRight: '10px' }} />
        {badge.count} Questions
      </p>
      <p>
        <FontAwesomeIcon icon={faStopwatch} style={{ marginRight: '10px' }} />
        {badge.timeLimit} Minutes
      </p>
      <ButtonGroup>
        <Button onClick={handleBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </Button>
        <Button onClick={handleGoClick}>
          <FontAwesomeIcon icon={faRocket} className="fa-beat" />
          <span>Go</span>
        </Button>
      </ButtonGroup>
    </Screen>
  );
}

Summary.propTypes = {
  onClose: PropTypes.PropTypes.func.isRequired,
  onDone: PropTypes.PropTypes.func.isRequired,
  badge: PropTypes.PropTypes.shape(badgeShape).isRequired,
};

export default Summary;
