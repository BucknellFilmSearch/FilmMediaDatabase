import pool from '../../postgres/dbClient';
import { boundingBoxMap } from '../utils';

const queryString = `
SELECT
	bounding_top,
	bounding_bottom,
	bounding_left,
	bounding_right,
	text_label,
	confidence,
	db_line_id
FROM
	media_recognized_objects
WHERE 
	db_line_id = (
	SELECT
		db_line_id
	FROM
	    media_text
	WHERE
	    line_number = $1::integer
	  AND
      oclc_id = $2::integer
  )
  AND
    confidence >= $3::real
`;

const boundingBox = (req, res) => {
  const { params, query } = req;

  // Set default confidence of 80% if not specified
  query.confidence = query.confidence || 0.80;

  const queryCfg = {
    text: queryString,
    values: [params.lineNumber, params.oclcId, query.confidence]
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
      results: boundingBoxMap(dbRes.rows)
    });
  });

};

export {
  boundingBox
};
