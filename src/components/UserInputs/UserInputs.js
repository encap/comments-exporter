import PropTypes from 'prop-types';
import ExportOptions from './ExportOptions';
import SearchOptions from './SearchOptions';

const UserInputs = ({ fetchComments }) => {
  return (
    <div>
      <SearchOptions fetchComments={fetchComments} />
      <ExportOptions />
    </div>
  );
};

UserInputs.propTypes = {
  fetchComments: PropTypes.func.isRequired,
};

export default UserInputs;
