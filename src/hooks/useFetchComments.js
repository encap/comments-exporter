import { useState, useEffect } from 'react';

const useFetchComments = (videoID, searchTerms) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const query = {
      videoID,
      searchTerms,
    };
    const url = `${
      process.env.REACT_APP_API_URL || 'http://localhost:3000'
    }?${new URLSearchParams(query)}`;
    fetch(url)
      .then(async (resp) => {
        const data = await resp.json();

        console.log(data);
        setComments(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return comments;
};

export default useFetchComments;
