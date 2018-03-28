import _ from 'lodash';

const boundingBoxMap = (rows) => {

  // Map the columns in each row to variable names
  return _.map(rows, (row) => {
    const {
      text_label: textLabel,
      bounding_left: boundingLeft,
      bounding_top: boundingTop,
      bounding_right: boundingRight,
      bounding_bottom: boundingBottom,
      confidence: confidence,
      id: id
    } = row;

    return {
      confidence,
      textLabel,
      bounding: [
        boundingLeft,                  // x
        boundingTop,                   // y
        boundingRight - boundingLeft,  // width
        boundingBottom - boundingTop   // height
      ],
      id
    };
  });
};

export default boundingBoxMap;
