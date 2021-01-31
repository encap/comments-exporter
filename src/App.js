import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useFetchComments from './hooks/useFetchComments';
import useRefsArray from './hooks/useRefsArray';
import CommentsList from './components/CommentsList';
import exportZipped from './helpers/exportZipped';
import { OptionsProvider } from './contexts/optionsContext';

const StyledBtn = styled.button`
  padding: 1em 2em;
`;

const App = () => {
  const [videoID, setvideoID] = useState('KgqJJECQQH0');
  const [searchTerms, setSearchTerms] = useState('nice video');
  const [strictMode, setStrict] = useState(true);
  const [highlight, setHighlight] = useState(true);

  const [options] = useState({
    searchTerms,
    strictMode,
    highlight,
  });

  const comments = useFetchComments(videoID, searchTerms);
  const [filteredComments, setFilteredComments] = useState(comments);
  const commentsRefs = useRefsArray(filteredComments);

  useEffect(() => {
    if (strictMode) {
      setFilteredComments(
        comments.filter(({ text }) =>
          text.toLowerCase().includes(searchTerms.toLowerCase()),
        ),
      );
    } else {
      setFilteredComments(comments);
    }
  }, [comments, strictMode, searchTerms]);

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
      <OptionsProvider value={options}>
        <CommentsList comments={filteredComments} commentsRefs={commentsRefs} />
      </OptionsProvider>
    </div>
  );
};

export default App;
