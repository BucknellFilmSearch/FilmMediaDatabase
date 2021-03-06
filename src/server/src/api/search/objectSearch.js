import { groupedMap } from '../utils/map';
import { query as queryDb } from '../utils/db';

const queryString = `
SELECT
  mm.oclc_id,
  mm.movie_title,
  mt.db_line_id,
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
    ro.text_label = $1::text
  AND
    ro.confidence >= $2
GROUP BY
  mm.oclc_id,
  mt.line_number,
  mt.start_time_stamp,
  mt.end_time_stamp,
  counts.line_count,
  mt.line_text,
  mt.db_line_id
ORDER BY
  mm.keyword_count DESC,
  mm.movie_title,
  mt.line_number;
`;

const objectSearch = (req, res) => {
  const { params, query } = req;

  query.confidence = query.confidence || 0.8;
  // Build query
  const queryCfg = {
    text: queryString,
    values: [params.text, query.confidence]
  };

  // TODO: Add density count updates

  // Run query
  queryDb(queryCfg, {
    mapper: groupedMap,
    err: () => res.status(500),
    cb: (data) => res.json(data)
  });
};

export default objectSearch;
