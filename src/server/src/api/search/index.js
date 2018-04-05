import textSearch from './textSearch';
import objectSearch from './objectSearch';
import { wrapResponse } from '../utils/response';

const search = (req, res) => {
  const { query } = req;

  // Default to text search
  const searchType = query.type || 'text';

  // Handle each type of search
  switch (searchType) {
    case 'text':    // Search for text in subtitles
      textSearch(req, res);
      break;
    case 'object':  // Search for objects in images
      objectSearch(req, res);
      break;
    default:
      res.status(500).json(wrapResponse({}, 500));
      throw Error('Unknown search type specified');
  }
};

export {
  search
};
