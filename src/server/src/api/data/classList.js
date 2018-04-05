import { query } from '../utils/db';
import _ from 'lodash';

const queryString = `
SELECT
	DISTINCT text_label
FROM
	media_recognized_objects
`;

const classList = (req, res) => {

  const queryCfg = {
    text: queryString
  };

  // Query from the default pool
  query(queryCfg, {
    mapper: (data) => _.map(data, (row) => row.text_label),
    err: () => res.status(500),
    cb: (data) => res.json(data)
  });
};

export {
  classList
};
