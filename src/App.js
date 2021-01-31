import useFetchComments from './hooks/useFetchComments';
import UserInputs from './components/UserInputs/UserInputs';
import CommentsList from './components/CommentsList/CommentsList';
import { StateContextProvider } from './context';

const App = () => {
  const [fetchComments, comments, isLoading, isError] = useFetchComments();

  return (
    <div className="App">
      <h1>Search and export comments as PNG</h1>
      <StateContextProvider>
        <UserInputs fetchComments={fetchComments} />
        <CommentsList
          comments={comments}
          isLoading={isLoading}
          isError={isError}
        />
      </StateContextProvider>
    </div>
  );
};

export default App;
