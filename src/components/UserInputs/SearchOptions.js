import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import stateContext from '../../context';
import { Button } from '../styled';

// searchTerms - string; space separated words;
// comment must include all terms,
// but they don't have to be consecutive nor in order
//
// verbatimMode - bool; sets client-side filtering
// matches whole searchTerm case insesitive

const FlexForm = styled.form`
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 10em;
  height: 10em;
`;
const SearchOptions = ({ fetchComments }) => {
  const { state, setState } = useContext(stateContext);

  const { register, handleSubmit } = useForm({
    defaultValues: state.searchOptions,
  });

  const onSubmit = (data) => {
    setState({
      type: 'setSearchOptions',
      payload: data,
    });
    fetchComments(data);
  };
  return (
    <div>
      <h3>Search options</h3>
      <FlexForm onSubmit={handleSubmit(onSubmit)}>
        <input name="videoId" ref={register} placeholder="videoID" />
        <input name="searchTerms" ref={register} placeholder="Search" />
        <label htmlFor="verbatimMode">
          <input
            name="verbatimMode"
            id="verbatimMode"
            type="checkbox"
            ref={register}
          />
          Verbatim Search
        </label>

        <Button type="submit">Search</Button>
      </FlexForm>
    </div>
  );
};

SearchOptions.propTypes = {
  fetchComments: PropTypes.func.isRequired,
};

export default SearchOptions;
