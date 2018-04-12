import { query } from '../utils/db';
import _ from 'lodash';

// Tricks Postgres into running a "loose indexscan"
// http://wiki.postgresql.org/wiki/Loose_indexscan
// This makes it WAY (10x) faster
const queryString = `
WITH RECURSIVE t AS (
  (
    SELECT
      text_label
    FROM 
      media_recognized_objects
    ORDER BY
      text_label
    LIMIT 1
  )
  UNION ALL
  SELECT (
    SELECT
      text_label
    FROM
      media_recognized_objects
    WHERE
      text_label > t.text_label
    ORDER BY
      text_label
    LIMIT 1
  )
  FROM
    t
  WHERE
    t.text_label IS NOT NULL
)
SELECT
  text_label
FROM
  t
WHERE
  text_label IS NOT NULL;
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
