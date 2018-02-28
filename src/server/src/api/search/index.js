import textSearch from './textSearch';
import objectSearch from './objectSearch';
const search = (req, res) => {
  const { query } = req;
  const searchType = query.type || 'text';

  // Handle each type of search
  switch (searchType) {
    case 'text':    // Search for text in subtitles
      textSearch(req, res);
      break;
    case 'object':  // Search for objects in images
      objectSearch(req, res);
      break;
    case 'mixed':   // Search in both subtitles and objects

      break;
    default:
      res.status(500);
      throw Error('Unknown search type specified');
  }
};

export {
  search
};
