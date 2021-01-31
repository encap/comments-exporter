import domtoimage from 'dom-to-image';
// eslint-disable-next-line import/no-unresolved
import { encode } from 'uzip-module';
import { saveAs } from 'file-saver';

const exportZipped = async (refsArray, options = {}) => {
  const files = await Promise.all(
    refsArray.map(async (ref, index) => {
      const commentNode = ref.current.querySelector('.comment');
      const pngBlob = await domtoimage.toBlob(commentNode);
      const pngUint8Arr = new Uint8Array(await pngBlob.arrayBuffer());

      // file entry for UZIP, ['dirname/filename', Uint8Array(data)]
      return [`${options.imgName || 'comment'}-${index + 1}.png`, pngUint8Arr];
    }),
  );

  const zipArrayBuffer = encode(Object.fromEntries(files));

  // UZIP return ArrayBuffer which needs to be convert to blob for file-saver
  const zipBlob = new Blob([new Uint8Array(zipArrayBuffer)], {
    type: 'application/zip',
  });

  saveAs(zipBlob, `${options.zipName || 'screenshots'}.zip`);
};

export default exportZipped;
