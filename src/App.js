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
  const [videoId, setvideoId] = useState('KgqJJECQQH0');
  // searchTerms - string; space separated; comment must include all terms, but they don't have to be consecutive
  const [searchTerms, setSearchTerms] = useState('a');
  // strictMode sets client-side filtering; matches whole searchTerm case insesitive
  const [strictMode, setStrict] = useState(true);
  const [highlight, setHighlight] = useState(true);

  // group for context
  const [options] = useState({
    searchTerms,
    strictMode,
    highlight,
  });

  const [isGeneratingScreenshots, setIsGeneratingScreenshots] = useState(false);

  const [comments, isLoading, isError] = useFetchComments(videoId, searchTerms);
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
    setIsGeneratingScreenshots(true);
    // WARN: Compute intensive function (10ms/comment)
    // execute in the following useEffect (after render to prevent UI blocking)
  };

  useEffect(async () => {
    if (isGeneratingScreenshots) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await exportZipped(commentsRefs, {
        zipName: `${searchTerms}-${videoId}-screenshots`,
      });
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
