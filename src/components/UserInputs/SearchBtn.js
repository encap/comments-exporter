import PropTypes from 'prop-types';
import { or, explicitNull } from 'airbnb-prop-types';

import { Button } from '../styled';

const SearchBtn = ({ onClick }) => {
  return (
    <Button type="button" {...{ onClick }}>
      Search
    </Button>
  );
};

SearchBtn.propTypes = {
  onClick: or([explicitNull(), PropTypes.func]).isRequired,
};

export default SearchBtn;
