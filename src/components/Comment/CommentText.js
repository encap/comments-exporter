import { useContext, useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import StateContext from '../../context';

const CommentText = ({ children: text }) => {
  const { searchOptions, exportOptions } = useContext(StateContext).state;
  const [searchWords, setSearchWords] = useState();

  useEffect(() => {
    if (exportOptions.highlight) {
      if (searchOptions.verbatimMode) {
        // @param: array<string>
        setSearchWords([searchOptions.searchTerms]);
      } else {
        setSearchWords(searchOptions.searchTerms.split(' '));
      }
    } else {
      setSearchWords([]);
    }
  }, [
    searchOptions.searchTerms,
    searchOptions.verbatimMode,
    exportOptions.highlight,
  ]);

  return searchWords ? (
    <Highlighter
      textToHighlight={text}
      highlightStyle={{
        background: '#ff3',
        padding: '0 0.2em',
      }}
      searchWords={searchWords}
    />
  ) : null;
};

export default CommentText;
