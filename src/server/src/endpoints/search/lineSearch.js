import _ from 'lodash';
import pool from '../../postgres/dbClient';

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
WHERE
    mt.oclc_id = mm.oclc_id 
  AND
    mt.search_vector @@ to_tsquery('english', $1::text)
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

const mapResults = (rows) => {

  const oclcIdMap = {};
  const groupedData = [];

  _(rows).each((row) => {
    // Unwrap row values to variables
    // format is:  [ column_name ]: [ variableName ]
    const {
      oclc_id: movieOclcId,
      movie_title: movieTitle,
      line_number: movieLineNumber,
      start_time_stamp: movieStartTimeStamp,
      end_time_stamp: movieEndTimeStamp,
      line_text: movieLineText,
      original_release_year: movieReleaseYear,
      dvd_release_year: dvdReleaseYear,
      runtime_in_minutes: runtimeInMinutes,
      line_count: totalNumberOfLines,
      genre1, genre2, genre3
    } = row;

    if (!_.has(oclcIdMap, `${row.oclc_id}`)) {
      // Add the movie to groupedData if it doesn't already exist
      oclcIdMap[`${row.oclc_id}`] = _.values(groupedData).length;
      groupedData[oclcIdMap[`${row.oclc_id}`]] = {
        runtimeInMinutes,
        genre1, genre2, genre3,
        movieReleaseYear,
        totalNumberOfLines,
        results: [{
          movieLineNumber,
          movieStartTimeStamp,
          movieEndTimeStamp,
          movieLineText
        }],
        dvdReleaseYear,
        movieOclcId,
        movieTitle
      };
    } else {
      // Add line data from the row to the existing movie
      groupedData[oclcIdMap[`${row.oclc_id}`]].results.push({
        movieLineNumber,
        movieStartTimeStamp,
        movieEndTimeStamp,
        movieLineText
      });
    }
  });

  return groupedData;
};


const lineSearch = (req, res) => {
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

export default lineSearch;
