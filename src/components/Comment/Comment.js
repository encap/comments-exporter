import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import exportOne from '../../helpers/exportOne';
import CommentText from './CommentText';

const StyledComment = styled.div`
  padding: 0.5em;
  margin-top: 0.5em;
  background: #181818;
  font-size: 15px;
`;

const StyledSaveBtn = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.1em 2em;
`;

const Comment = ({ comm, index, forwardRef }) => {
  const save = (ref) => {
    const commentEl = ref.current.querySelector('.comment');
    exportOne(commentEl, `test-screenshot-${index + 1}`);
  };
  return (
    <li ref={forwardRef}>
      <StyledComment className="comment">
        <img src={comm.img} alt="profile" />
        <b> {comm.author}</b>
        <i> {comm.date}</i>
        <p>
          <CommentText>{comm.text}</CommentText>
        </p>
        <h3>
          L: {comm.likes} R: {comm.replies}
        </h3>
      </StyledComment>
      <StyledSaveBtn onClick={() => save(forwardRef)}>Save</StyledSaveBtn>
    </li>
  );
};

Comment.propTypes = {
  comm: PropTypes.shape({
    img: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    replies: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  forwardRef: PropTypes.object.isRequired,
};

export default Comment;
