import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import OptionsContext from '../../contexts/optionsContext';

const CommentText = ({ children: text }) => {
  const { searchTerms, strictMode, highlight } = useContext(OptionsContext);
  const [searchWords, setSearchWords] = useState();

  useEffect(() => {
    if (highlight) {
      if (strictMode) {
        // @param: array<string>
        setSearchWords([searchTerms]);
      } else {
        setSearchWords(searchTerms.split(' '));
      }
    } else {
      setSearchWords([]);
    }
  }, [searchTerms, strictMode, highlight]);

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

CommentText.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CommentText;
