import pool from '../../postgres/dbClient';
import mapBBResults from 'dataUtils';
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
    ro.db_line_id = '$1::text'
  AND
    ro.confidence >= $2::float
;
`;

const boundingBox = (req, res) => {
  const {params} = req;

  const queryCfg = {
    text: queryString,
    values: [params.text, params.confidence]
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
      results: mapBBResults(queryString) //TEMPORARY, THIS IS WRONG
    });
  });

};

export {
  boundingBox
};
