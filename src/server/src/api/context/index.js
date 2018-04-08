import { query } from '../utils/db';
import { groupedMap } from '../utils/map';

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
  mt.oclc_id = $1::integer
AND
  mt.line_number < $2::integer + 4 --magic number we got from team endframe
AND
  mt.line_number > $2::integer - 4
AND
  mm.movie_or_tv_show = 'Movie'
ORDER BY
  mt.line_number`;

const getContext = (req, res) => {
  const { params: { oclcId, lineNumber } } = req;

  // Build query
  const queryCfg = {
    text: queryString,
    values: [oclcId, lineNumber]
  };

  const customMap = (data) => groupedMap(data)[0];
  const customWrapper = (data, status) => ({ status, context: data });

  // Run query
  query(queryCfg, {
    mapper: customMap,
    wrapper: customWrapper,
    err: () => res.status(500),
    cb: (data) => res.json(data)
  });
};

export {
  getContext
};
