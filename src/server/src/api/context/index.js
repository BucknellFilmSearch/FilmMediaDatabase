import pool from '../../postgres/dbClient';
import { mapResults } from '../search/searchUtils';

const queryString = `
SELECT
  DISTINCT mm.oclc_id,
  mm.movie_title,
  mt.line_number,
  mt.start_time_stamp,
  mt.end_time_stamp,
  mt.line_text,
  mm.original_release_year,
  mm.dvd_release_year
FROM
  media_metadata mm
INNER JOIN
  media_text mt
  ON
    mt.oclc_id = mm.oclc_id
WHERE
  mt.oclc_id = $1:integer
AND
  mt.line_number < $2:integer + 40 --magic number we got from team endframe
AND
  mt.line_number > $2:integer - 40
AND
  mm.movie_or_tv_show = 'Movie'
ORDER BY
  mt.line_number`;

const getContext = (req, res) => {
  const { params } = req;
  const { oclcId, lineNumber } = params;

  // Build query
  const queryCfg = {
    text: queryString,
    values: [oclcId, lineNumber]
  };

  // Run query
  pool.query(queryCfg, (err, dbRes) => {
    if (err) {
      console.error(err);
      res.status(err.status || 500);
      throw err;
    }
    // Return the mapped results
    res.json({
      results: mapResults(dbRes.rows)
    });
  });
};

export {
  getContext
};
