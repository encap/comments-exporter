import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const StyledLi = styled.li`
  padding: 0.5em;
  margin: 0.5em;
  background: #181818;
  font-size: 15px;
`;

const Comment = ({ comm, forwardRef }) => {
  return (
    <StyledLi ref={forwardRef}>
      <img src={comm.img} alt="profile" />
      <b> {comm.author}</b>
      <i> {comm.date}</i>
      <p>{comm.text}</p>
      <h3>
        L: {comm.likes} R: {comm.replies}
      </h3>
    </StyledLi>
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
  forwardRef: PropTypes.object.isRequired,
};

export default Comment;
