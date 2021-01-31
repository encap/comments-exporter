// Google Cloud Function

const https = require('https');

exports.getComments = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    const { totalLimit, maxResults } = req.query;
    const params = {
      ...req.query,
      maxResults: maxResults > totalLimit ? totalLimit : maxResults || 100,
      key: process.env.YOUTUBE_API_KEY,
      textFormat: 'plainText',
      part: 'snippet',
    };

    let comments = [];

    const endWithError = (err, statusCode = 500) => {
      console.error(err);
      res.sendStatus(statusCode);
    };

    const getPage = (pageToken = '') => {
      delete params.totalLimit;

      console.log(JSON.stringify(params, null, 2));

      const url = `https://www.googleapis.com/youtube/v3/commentThreads?${new URLSearchParams(
        { ...params, pageToken },
      ).toString()}`;

      https
        .get(url, (resp) => {
          if (resp.statusCode === 200) {
            let data = '';

            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              const parsedData = JSON.parse(data);
              console.log(`fetched page ${parsedData.items.length}`);
              comments = comments.concat(
                parsedData.items.map((item) => {
                  const comm = item.snippet.topLevelComment.snippet;
                  return {
                    id: item.id,
                    replies: item.snippet.totalReplyCount,
                    date: comm.publishedAt,
                    text: comm.textOriginal,
                    author: comm.authorDisplayName,
                    img: comm.authorProfileImageUrl,
                    likes: comm.likeCount,
                  };
                }),
              );

              if (
                parsedData.nextPageToken &&
                (!totalLimit || comments.length < totalLimit)
              ) {
                getPage(parsedData.nextPageToken);
              } else {
                console.log('sending comments');
                res.json(comments.slice(0, totalLimit));
              }
            });
          } else {
            endWithError(new Error('Youtube API not 200'), resp.statusCode);
          }
        })
        .on('error', (err) => {
          endWithError(err);
        });
    };
    getPage();
  }
};
