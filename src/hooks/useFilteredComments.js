import { useState, useEffect, useContext } from 'react';
import StateContext from '../context';

const useFilteredComments = (comments) => {
  const [filteredComments, setFilteredComments] = useState(comments);

  const { searchOptions } = useContext(StateContext).state;

  useEffect(() => {
    if (searchOptions.verbatimMode && comments.length) {
      setFilteredComments(
        comments.filter(({ text }) => {
          return (
            text &&
            text.toLowerCase().includes(searchOptions.searchTerms.toLowerCase())
          );
        }),
      );
    } else {
      setFilteredComments(comments);
    }
  }, [comments, searchOptions.verbatimMode, searchOptions.searchTerms]);

  return filteredComments;
};
export default useFilteredComments;
