import _ from 'lodash';

const mapBBResults = (rows) => {

  // Map the columns in each row to variable names
  return _.map(rows, (row) => {
    const {
      text_label: objectTextLabel,
      bounding_left: objectBoundingLeft,
      bounding_top: objectBoundingTop,
      bounding_right: objectBoundingRight,
      bounding_bottom: objectBoundingBottom,
      confidence: objectConfidence
    } = row;

    return {
      objectTextLabel,
      objectBoundingLeft,
      objectBoundingTop,
      objectBoundingRight,
      objectBoundingBottom,
      objectConfidence
    };
  });
};

export {mapBBResults};
