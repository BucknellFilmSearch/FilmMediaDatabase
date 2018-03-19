import _ from 'lodash';

const simpleMap = (rows) => {
  return _(rows).each((row) => {
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

    return {
      movieOclcId,
      movieTitle,
      movieDbLineId,
      movieLineNumber,
      movieStartTimeStamp,
      movieEndTimeStamp,
      movieLineText,
      movieReleaseYear,
      dvdReleaseYear,
      runtimeInMinutes,
      totalNumberOfLines,
      genre1, genre2, genre3
    };
  });
};

export default simpleMap;
