import { useState, useEffect } from 'react';

const useFetchComments = (videoID, searchTerms) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const query = `?videoID=${videoID}&searchTerms=${searchTerms}`;
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + query)
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
