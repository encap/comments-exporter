import styled from 'styled-components';
import useFetchComments from './hooks/useFetchComments';

const StyledLi = styled.li`
  padding: 0.5em;
  margin: 0.5em;
`;

const StyledP = styled.p`
  font-size: 2em;
`;

const App = () => {
  const comments = useFetchComments('uIyKS_9tP08', 'poster');

  return (
    <div className="App">
      {comments ? (
        <ol>
          {comments.map((comment) => (
            <StyledLi key={comment.id}>{comment.text}</StyledLi>
          ))}
        </ol>
      ) : (
        <StyledP>Loading...</StyledP>
      )}
    </div>
  );
};

export default App;
