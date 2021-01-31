import { useEffect, useState, useContext } from 'react';
import exportZipped from '../helpers/exportZipped';
import StateContext from '../context';

const useGeneratedScreenshots = (commentsRefs) => {
  const { searchOptions } = useContext(StateContext).state;

  const [isGeneratingScreenshots, setIsGeneratingScreenshots] = useState(false);
  const generateScreenshots = () => {
    setIsGeneratingScreenshots(true);
    // WARN: Compute intensive function (10ms/comment)
    // execute in the following useEffect (after render to prevent UI blocking)
  };

  useEffect(async () => {
    if (isGeneratingScreenshots) {
      await exportZipped(commentsRefs, {
        zipName: `${searchOptions.searchTerms}-${searchOptions.videoId}-screenshots`,
      });
      setIsGeneratingScreenshots(false);
    }
  }, [isGeneratingScreenshots]);

  return [isGeneratingScreenshots, generateScreenshots];
};

export default useGeneratedScreenshots;
