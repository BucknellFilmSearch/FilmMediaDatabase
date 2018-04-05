import { query as queryDb } from '../utils/db';

const queryString = `
UPDATE media_recognized_objects ro
SET confidence = ROUND((confidence*.9)::numeric, 2)
WHERE
    ro.id = $1
`;

const deleteString = `
DELETE FROM media_recognized_objects ro
WHERE
    ro.confidence <= .05
`;

const reportObject = (req, res) => {
  const { params } = req;

  const queryCfg = {
    text: queryString,
    values: [params.id]
  };

  // Flag the item and send the response
  queryDb(queryCfg, {
    err: () => res.status(500),
    mapper: (data) => data.id,
    cb: (data) => res.json(data)
  });

  const deleteCfg = {
    text: deleteString,
    values: []
  };

  // Run the delete query -- no handler needed
  queryDb(deleteCfg);
};

export {
  reportObject
};
