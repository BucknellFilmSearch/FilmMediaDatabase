import lineSearch from './lineSearch';

const textSearch = (req, res) => {
  const { query } = req;
  const searchType = query.type || 'line';

  // Handle each type of search
  switch (searchType) {
    case 'line':    // Search for text in subtitles
      lineSearch(req, res);
      break;
    case 'object':  // Search for objects in images

      break;
    case 'mixed':   // Search in both subtitles and objects

      break;
    default:
      res.status(500);
      throw Error('Unknown search type specified');
  }
};

export {
  textSearch
};
