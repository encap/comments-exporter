import React, { useReducer } from 'react';

const initialState = {
  searchOptions: {
    videoId: 'KgqJJECQQH0',
    searchTerms: 'nice video',
    verbatimMode: true,
  },
  exportOptions: {
    highlight: true,
  },
};

const StateContext = React.createContext(initialState);
const stateReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setSearchOptions':
      return { ...state, searchOptions: payload };
    case 'setExportOptions':
      return { ...state, ExportOptions: payload };
    default:
      throw new Error();
  }
};

const StateContextProvider = ({ children }) => {
  const [state, setState] = useReducer(stateReducer, initialState);
  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
export { StateContextProvider };
