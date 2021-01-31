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
  const [searchTerms, setSearchTerms] = useState('a');
  const [strictMode, setStrict] = useState(true);
  const [highlight, setHighlight] = useState(true);

  const [options] = useState({
    searchTerms,
    strictMode,
    highlight,
  });

  const [isGeneratingScreenshots, setIsGeneratingScreenshots] = useState(false);

  const [comments, isLoading, isError] = useFetchComments(videoID, searchTerms);
  const [filteredComments, setFilteredComments] = useState(comments);
  const commentsRefs = useRefsArray(filteredComments);

  useEffect(() => {
    if (strictMode && comments) {
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
    console.warn('start');
    setIsGeneratingScreenshots(true);
  };

  useEffect(async () => {
    // WARN: Compute intensive function
    // execute in useEffect (after render to prevent UI blocking)
    if (isGeneratingScreenshots) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await exportZipped(commentsRefs, {
        zipName: `${searchTerms}-${videoID}-screenshots`,
      });
      console.warn('end');
      setIsGeneratingScreenshots(false);
    }
  }, [isGeneratingScreenshots]);

  return (
    <div className="App">
      <StyledBtn type="button" onClick={save}>
        {isGeneratingScreenshots ? 'Generating...' : 'Save'}
      </StyledBtn>
      <OptionsProvider value={options}>
        <CommentsList
          comments={filteredComments}
          commentsRefs={commentsRefs}
          isLoading={isLoading}
          isError={isError}
        />
      </OptionsProvider>
    </div>
  );
};

export default App;
