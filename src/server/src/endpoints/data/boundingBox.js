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
    ro.confidence >= .85
;
`;

const boundingBox = (req, res) => {
  const {params} = req;

  const queryCfg = {
    text: queryString,
    values: [params.text]
  };

  // TODO: Add density count updates
  pool.query(queryCfg, (err, dbRes) => {
    if (err) {
      console.error(err);
      res.status(err.status || 500);
      throw err;
    }
    // Return the mapped results
    res.json({
      results: mapBBResults(dbRes.rows) //TEMPORARY, THIS IS WRONG
    });
  });

};

export {
  boundingBox
};
