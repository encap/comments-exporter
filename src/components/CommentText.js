import PropTypes from 'prop-types';

const CommentText = ({ children: text }) => {
  return <p>{text}</p>;
};

CommentText.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CommentText;
