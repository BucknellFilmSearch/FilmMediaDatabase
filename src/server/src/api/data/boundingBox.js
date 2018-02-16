import pool from '../../postgres/dbClient';
import { mapBBResults } from './dataUtils';

const queryString = `
SELECT
    ro.text_label,
    ro.bounding_left,
    ro.bounding_top,
    ro.bounding_right,
    ro.bounding_bottom,
    ro.confidence
FROM
    media_recognized_objects ro
WHERE
    ro.db_line_id = $1
  AND
    ro.confidence >= $2
;
`;

const boundingBox = (req, res) => {
  const { params, query } = req;

  // Set default confidence of 80% if not specified
  query.confidence = query.confidence || 0.80;

  const queryCfg = {
    text: queryString,
    values: [params.dbLineId, query.confidence]
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
      results: mapBBResults(dbRes.rows)
    });
  });

};

export {
  boundingBox
};
