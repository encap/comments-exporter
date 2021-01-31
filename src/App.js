import styled from 'styled-components';
import { useState } from 'react';
import useFetchComments from './hooks/useFetchComments';
import useRefsArray from './hooks/useRefsArray';
import CommentsList from './components/CommentsList';
import exportZipped from './helpers/exportZipped';

const StyledBtn = styled.button`
  padding: 1em 2em;
`;

const App = () => {
  const [videoID, setvideoID] = useState('KgqJJECQQH0');
  const [searchTerms, setSearchTerms] = useState('nice');
  const comments = useFetchComments(videoID, searchTerms);
  const commentsRefs = useRefsArray(comments);

  const save = () => {
    exportZipped(commentsRefs, {
      zipName: `${searchTerms}-${videoID}-screenshots`,
    });
  };

  return (
    <div className="App">
      <StyledBtn type="button" onClick={save}>
        Save
      </StyledBtn>
      <CommentsList comments={comments} commentsRefs={commentsRefs} />
    </div>
  );
};

export default App;
