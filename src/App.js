import styled from 'styled-components';
import domtoimage from 'dom-to-image';
// eslint-disable-next-line import/no-unresolved
import { encode } from 'uzip-module';
import { saveAs } from 'file-saver';
// import { createRef, useRef } from 'react';

import useFetchComments from './hooks/useFetchComments';

const StyledLi = styled.li`
  padding: 0.5em;
  margin: 0.5em;
  background: #181818;
  font-size: 15px;
`;

const StyledP = styled.p`
  font-size: 2em;
`;

const App = () => {
  const comments = useFetchComments('KgqJJECQQH0', 'microsoft');
  const commentsRefs = [];

  const save = async () => {
    console.log('export started');
    console.log(commentsRefs);
    const files = await Promise.all(
      commentsRefs.map(async (node, index) => {
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
      {comments ? (
        <ol>
          {comments.map((comm) => (
            <StyledLi ref={(ref) => commentsRefs.push(ref)} key={comm.id}>
              <img src={comm.img} alt="profile" />
              <b> {comm.author}</b>
              <i> {comm.date}</i>
              <p>{comm.text}</p>
              <h3>
                L: {comm.likes} R: {comm.replies}
              </h3>
            </StyledLi>
          ))}
          {/* <StyledLi ref={node}>{comments[0].text}</StyledLi> */}
        </ol>
      ) : (
        <StyledP>Loading...</StyledP>
      )}
    </div>
  );
};

export default App;
