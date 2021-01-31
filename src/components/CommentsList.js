import PropTypes from 'prop-types';
import Comment from './Comment';
import LoadingMsg from './LoadingMsg';

const CommentsList = ({ comments, commentsRefs }) => {
  return comments.length && commentsRefs.length ? (
    <ol>
      {comments.map((comm, index) => (
        <Comment
          forwardRef={commentsRefs[index]}
          key={comm.id}
          comm={comm}
          index={index}
        />
      ))}
    </ol>
  ) : (
    <LoadingMsg />
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  commentsRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentsList;
