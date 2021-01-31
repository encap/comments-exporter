import styled from 'styled-components';
import domtoimage from 'dom-to-image';
// eslint-disable-next-line import/no-unresolved
import { encode } from 'uzip-module';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

import Comment from './components/Comment';
import useFetchComments from './hooks/useFetchComments';

const StyledP = styled.p`
  font-size: 2em;
`;

const App = () => {
  const comments = useFetchComments('KgqJJECQQH0', 'nice');
  const [commentsRefs, setCommentsRefs] = useState([]);

  useEffect(() => {
    console.log('update');
    setCommentsRefs(
      Array(comments.length)
        .fill(0)
        .map(() => React.createRef()),
    );
    setTimeout(() => {
      console.log(commentsRefs);
    }, 2000);
  }, [comments]);

  const save = async () => {
    console.log('export started');
    console.log(commentsRefs);
    const files = await Promise.all(
      commentsRefs.map(async ({ current: node }, index) => {
        const pngBlob = await domtoimage.toBlob(node);
        const pngUint8Arr = new Uint8Array(await pngBlob.arrayBuffer());

        return [`comment${index + 1}.png`, pngUint8Arr];
      }),
    );

    console.log(files);

    const zipArrayBuffer = encode(Object.fromEntries(files));

    const zipBlob = new Blob([new Uint8Array(zipArrayBuffer)], {
      type: 'application/zip',
    });

    saveAs(zipBlob, 'screenshots.zip');
  };

  return (
    <div className="App">
      <button type="button" onClick={save}>
        Save
      </button>
      {comments.length && commentsRefs.length ? (
        <ol>
          {comments.map((comm, index) => (
            <Comment
              forwardRef={commentsRefs[index]}
              key={comm.id}
              comm={comm}
            />
          ))}
        </ol>
      ) : (
        <StyledP>Loading...</StyledP>
      )}
    </div>
  );
};

export default App;
