import { useContext } from 'react';
import stateContext from '../../context';

const SearchOptions = () => {
  // searchTerms - string; space separated;
  // comment must include all terms, but they don't have to be consecutive

  const { state, setState } = useContext(stateContext);
  console.log(state);
  return (
    <div>
      <h3>Search options</h3>
    </div>
  );
};

export default SearchOptions;
