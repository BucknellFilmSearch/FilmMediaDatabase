import pool from '../../postgres/dbClient';
import {mapResults} from './searchUtils';

const queryString = `
SELECT
  mm.oclc_id,
  mm.movie_title,
  mt.line_number,
  mt.start_time_stamp,
  mt.end_time_stamp,
  mt.line_text,
  mm.original_release_year,
  mm.dvd_release_year,
  mm.runtime_in_minutes,
  counts.line_count,
  mm.genre1,
  mm.genre2,
  mm.genre3
FROM
  media_metadata mm
INNER JOIN
    media_text mt
  ON
    mt.oclc_id = mm.oclc_id
INNER JOIN
    (SELECT
      oclc_id, MAX(line_number) AS line_count
    FROM
      media_text
    GROUP
      BY oclc_id ) counts
  ON
    counts.oclc_id = mm.oclc_id
INNER JOIN
    media_recognized_objects ro
  ON
    ro.db_line_id = mt.db_line_id
WHERE
    mt.oclc_id = mm.oclc_id
  AND
    ro.text_label = '$1::text'
GROUP BY
  mm.oclc_id,
  mt.line_number,
  mt.start_time_stamp,
  mt.end_time_stamp,
  counts.line_count,
  mt.line_text
ORDER BY
  mm.keyword_count DESC,
  mm.movie_title,
  mt.line_number;
`;

const lineQueryString = `
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


const objectSearch = (req, res) => {
  const {params} = req;

  // Build query
  const queryCfg = {
    text: queryString,
    values: [params.text]
  };

  // TODO: Add density count updates

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

const lineObjectSearch = (req, res) => {
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
    // Map mapResults
    dbRes.
    // Return the mapped results
    res.json({
      results: lineQueryString //TEMPORARY, THIS IS WRONG
    });
  });

};

export {objectSearch, lineObjectSearch};
