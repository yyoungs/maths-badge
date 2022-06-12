import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.color || '#2d499d'};
  border: none;
  color: ${(props) => (props.color === '#fff' ? '#000' : '#fff')};
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    filter: brightness(80%);
  }

  > svg {
    margin-right: 8px;
  }
`;

export default Button;
