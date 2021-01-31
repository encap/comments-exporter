import { useState } from 'react';

const useFetchComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchComments = (params) => {
    console.log('TEst');
    setIsLoading(true);
    console.log(params);
    const query = {
      totalLimit: 100,
      ...params,
    };

    const url = `${
      process.env.REACT_APP_API_URL || 'http://localhost:3000'
    }?${new URLSearchParams(query)}`;

    fetch(url)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          console.log('fetched', data);

          setComments(data);
          setIsLoading(false);
          setIsError(false);
        } else {
          console.warn(res.status);
          throw Error('Response not ok');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.error(err);
      });
  };

  return [fetchComments, comments, isLoading, isError];
};

export default useFetchComments;
