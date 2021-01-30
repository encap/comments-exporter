// Google Cloud Function

const https = require('https');

exports.getComments = (req, res) => {
  const { totalLimit, videoID, maxResults, order, searchTerms } = req.query;
  let comments = [];

  const getPage = (pageToken = '') => {
    https
      .get(
        `https://www.googleapis.com/youtube/v3/commentThreads?pageToken=${pageToken}&key=${
          process.env.YOUTUBE_API_KEY
        }&part=id%2Csnippet&videoId=${videoID}&maxResults=${
          maxResults || 100
        }&order=${order || 'relevance'}&searchTerms=${searchTerms}`,
        (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            const parsedData = JSON.parse(data);
            console.log(`fetched page ${parsedData.items.length}`);
            comments = comments.concat(
              parsedData.items.map((comment) => ({
                id: comment.id,
                text: comment.snippet.topLevelComment.snippet.textOriginal,
              })),
            );

            if (
              parsedData.nextPageToken &&
              (!totalLimit || comments.length < totalLimit)
            ) {
              getPage(parsedData.nextPageToken);
            } else {
              console.log('sending comments');
              res.json(comments);
            }
          });
        },
      )
      .on('error', (err) => {
        console.log(`Error: ${err.message}`);
        res.sendStatus(500);
      });
  };

  getPage();
};
