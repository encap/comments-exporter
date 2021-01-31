import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const exportOne = async (node, fileName = 'screenshot') => {
  const pngBlob = await domtoimage.toBlob(node);
  saveAs(pngBlob, `${fileName}.png`);
};

export default exportOne;
