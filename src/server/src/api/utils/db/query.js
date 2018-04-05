import pool from '../../../postgres/dbClient';
import { wrapResponse } from '../response';
import _ from 'lodash';

/**
 * Run a request on the postgres client, using the handler and callback.
 * Data is wrapped with the standard wrapper by default, and the mapper
 * does nothing to modify the data.
 *
 * Default Options:
 * {
 *   mapper: (data) => data,
 *   wrapper: (data, status) => wrapResponse(data, status),
 *   err: (err) => console.log(err),
 *   cb: (data, status) => console.log(data, status)
 * }
 *
 * @param {object} cfg The configuration for the pg query
 * @param {object} opts Other options available for handling data
 * @returns {undefined}
 */
const query = (cfg, opts = {}) => {

  // Override default opts
  const overridden = _.assign({}, {
    mapper: (data) => data,
    wrapper: (data, status) => wrapResponse(data, status),
    err: (err) => console.log(err),
    cb: () => {}
  }, opts);

  // Run query
  pool.query(cfg, (err, dbRes) => {
    // Only call handler if hit an error
    if (err) {
      console.error(err.message);
      overridden.err(err);
    }

    // Return the mapped/wrapped results
    overridden.cb(overridden.wrapper(overridden.mapper(dbRes.rows), err ? 500 : 200));
  });
};

export default query;
