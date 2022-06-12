import { PropTypes } from 'prop-types';
import { React } from 'react';
import styled from 'styled-components';

import { badgeShape } from './badges';
import Button from './Button';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * Renders a list of buttons representing the badges
 */
function BadgeList({ badges, onClick: handleClick }) {
  const buttons = badges.map((b, i) => (
    <Button key={b.name} color={b.color} onClick={() => handleClick(i)}>
      {typeof b.name === 'function' ? b.name() : b.name}
    </Button>
  ));
  return <ButtonGroup>{buttons}</ButtonGroup>;
}

BadgeList.propTypes = {
  onClick: PropTypes.func.isRequired,
  badges: PropTypes.arrayOf(PropTypes.shape(badgeShape)).isRequired,
};

export default BadgeList;
