import pool from '../../postgres/dbClient';
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
  pool.query(queryCfg, (err, dbRes) => {
    if (err) {
      console.error(err);
      res.status(err.status || 500);
      throw err;
    }
    // Send the mapped results
    res.json({
      results: _.map(dbRes.rows, (row) => row.text_label)
    });
  });

};

export {
  classList
};
