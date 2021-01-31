import PropTypes from 'prop-types';
import Comment from './Comment/Comment';
import LoadingMsg from './LoadingMsg';
import CommentsNotFound from './CommentsNotFound';
import FetchError from './FetchError';

const CommentsList = ({ comments, commentsRefs, isLoading, isError }) => {
  if (isLoading) {
    return <LoadingMsg />;
  }
  if (isError) {
    return <FetchError />;
  }

  if (comments.length === 0) {
    return <CommentsNotFound />;
  }

  return (
    <div>
      <h3>
        Found {comments.length} comment{comments.length === 1 ? '' : 's'}
      </h3>
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
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  commentsRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default CommentsList;
