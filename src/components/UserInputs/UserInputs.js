import PropTypes from 'prop-types';
import { useContext } from 'react';
import ExportOptions from './ExportOptions';
import SearchOptions from './SearchOptions';
import SearchBtn from './SearchBtn';
import stateContext from '../../context';

const UserInputs = ({ fetchComments }) => {
  const { searchOptions } = useContext(stateContext).state;

  return (
    <div>
      <SearchOptions />
      <SearchBtn onClick={() => fetchComments(searchOptions)} />
      <ExportOptions />
    </div>
  );
};

UserInputs.propTypes = {
  fetchComments: PropTypes.func.isRequired,
};

export default UserInputs;
