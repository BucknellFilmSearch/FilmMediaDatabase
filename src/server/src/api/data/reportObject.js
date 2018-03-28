import pool from '../../postgres/dbClient';

const queryString = `
UPDATE media_recognized_objects ro
SET confidence = ROUND((confidence*.9)::numeric, 2)
WHERE
    ro.id = $1
;
`;
//TODO: Review this delete string
const deleteString = `
DELETE FROM media_recognized_objects ro
WHERE
    ro.confidence <= .05
;
`;

const reportObject = (req, res) => {
  const { params } = req;
  const queryCfg = {
    text: queryString,
    values: [params.id]
  };

  // Query from the default pool
  pool.query(queryCfg, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status || 500);
      throw err;
    }

    res.json({
      results: params.id
    });
  });
  const deleteCfg = {
    text: deleteString,
    values: []
  };
  pool.query(deleteCfg, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status || 500);
      throw err;
    }
  });
};

export {
  reportObject
};
