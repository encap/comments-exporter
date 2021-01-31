import styled from 'styled-components';

const StyledP = styled.p`
  color: #f00;
`;

const FetchError = () => {
  return (
    <StyledP>
      Server is currently unavailable or is unable to search comments for
      provided ID
    </StyledP>
  );
};

export default FetchError;
