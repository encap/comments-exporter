import React, { useState, useEffect } from 'react';

const useRefsArray = (array) => {
  const [refsArray, setRefsArray] = useState([]);

  useEffect(() => {
    setRefsArray(
      Array(array.length)
        .fill(0)
        .map(() => React.createRef()),
    );
  }, [array]);

  return refsArray;
};

export default useRefsArray;
