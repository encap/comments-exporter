import PropTypes from 'prop-types';

import { Button } from '../styled';

const SearchBtn = ({ onClick }) => {
  return (
    <Button type="button" {...{ onClick }}>
      Search
    </Button>
  );
};

SearchBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchBtn;
