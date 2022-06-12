import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { React } from 'react';

/**
 * Badge data
 */

const badgeShape = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  color: PropTypes.string,
  desc: PropTypes.string,
  count: PropTypes.number,
  questionTypes: PropTypes.array,
  timeLimit: PropTypes.number,
};

const badges = [
  {
    name: 'Green',
    color: '#04AA6D',
    desc: 'Addition to 10',
    count: 40,
    questionTypes: [{ type: '+', args: [10] }],
    timeLimit: 10,
  },
  {
    name: 'Dark Green',
    color: '#024b30',
    desc: 'Addition to 20',
    count: 40,
    questionTypes: [{ type: '+', args: [20] }],
    timeLimit: 10,
  },
  {
    name: 'Pink',
    color: '#ff66ff',
    desc: 'Subtraction to 20',
    count: 40,
    questionTypes: [{ type: '-', args: [20] }],
    timeLimit: 10,
  },
  {
    name: 'Dark Pink',
    color: '#b300b3',
    desc: 'Addition/Subtraction to 20',
    count: 48,
    questionTypes: [
      { type: '+', args: [20] },
      { type: '-', args: [20] },
    ],
    timeLimit: 10,
  },
  {
    name: 'White',
    color: '#fff',
    desc: '0, 1, 2, 3, 5 and 10x tables to 10',
    count: 48,
    questionTypes: [{ type: '*', args: [[0, 1, 2, 3, 4, 5, 10], 10] }],
    timeLimit: 10,
  },
  {
    name: 'Purple',
    color: '#ab82ff',
    desc: 'Addition/Subtraction to 20 plus times tables from white badge',
    count: 52,
    questionTypes: [
      { type: '*', args: [[0, 1, 2, 3, 4, 5, 10], 10] },
      { type: '+', args: [20] },
      { type: '-', args: [20] },
    ],
    timeLimit: 10,
  },
  {
    name: 'Sky Blue',
    color: '#00ccff',
    desc: '0, 1, 2, 3, 4, 5, 8 and 10x tables to 12',
    count: 52,
    questionTypes: [{ type: '*', args: [[0, 1, 2, 3, 4, 5, 8, 10], 12] }],
    timeLimit: 10,
  },

  {
    name: 'Orange',
    color: '#ff6600',
    desc: '0, 1, 2, 3, 4, 5, 8 and 10x tables to 12',
    count: 60,
    questionTypes: [{ type: '*', args: [[0, 1, 2, 3, 4, 5, 8, 10], 12] }],
    timeLimit: 10,
  },
  {
    name: () => <FontAwesomeIcon icon={faStar} color="yellow" />,
    color: '',
    desc: 'All division facts from 1-12 x tables',
    count: 100,
    questionTypes: [
      { type: '*', args: [[0, 1, 2, 3, 4, 5, 8, 10, 11, 12], 12] },
    ],
    timeLimit: 10,
  },
  {
    name: () => (
      <>
        <FontAwesomeIcon icon={faStar} color="yellow" />
        Divide
      </>
    ),
    color: '',
    desc: 'All times tables up to 12',
    count: 100,
    questionTypes: [{ type: '÷', args: [12] }],
    timeLimit: 10,
  },
];

export { badges, badgeShape };
