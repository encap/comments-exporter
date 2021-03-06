import PropTypes from 'prop-types';
import { or, explicitNull } from 'airbnb-prop-types';
import Comment from '../Comment/Comment';
import LoadingMsg from './LoadingMsg';
import CommentsNotFound from './CommentsNotFound';
import FetchError from './FetchError';
import { Button } from '../styled';
import useRefsArray from '../../hooks/useRefsArray';
import useFilteredComments from '../../hooks/useFilteredComments';
import useGeneratedScreenshots from '../../hooks/useGenerateScreenshots';

const CommentsList = ({ comments, isLoading, isError }) => {
  const filteredComments = useFilteredComments(comments);
  const commentsRefs = useRefsArray(filteredComments);

  const [
    isGeneratingScreenshots,
    generateScreenshots,
  ] = useGeneratedScreenshots(commentsRefs);

  if (isLoading === true) {
    return <LoadingMsg />;
  }
  if (isLoading === null) {
    return null;
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
      <Button type="button" onClick={generateScreenshots}>
        {isGeneratingScreenshots ? 'Generating...' : 'Save'}
      </Button>
      <ol>
        {filteredComments.map((comm, index) => (
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
  isLoading: or([explicitNull(), PropTypes.bool]).isRequired,
  isError: or([explicitNull(), PropTypes.bool]).isRequired,
};

export default CommentsList;
