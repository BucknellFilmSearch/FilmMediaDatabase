import _ from 'lodash';
const mapResults = (rows) => {

  const oclcIdMap = {};
  const groupedData = [];

  _(rows).each((row) => {
    // Unwrap row values to variables
    // format is:  [ column_name ]: [ variableName ]
    const {
      oclc_id: movieOclcId,
      movie_title: movieTitle,
      db_line_id: movieDbLineId,
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
          movieDbLineId,
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
        movieDbLineId,
        movieLineNumber,
        movieStartTimeStamp,
        movieEndTimeStamp,
        movieLineText
      });
    }
  });

  return groupedData;
};
export default mapResults;
