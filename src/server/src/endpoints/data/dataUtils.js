import _ from 'lodash';
const mapBBResults = (rows) => {

  const data = [];

  _(rows).each((row) => {
    const {
      text_label: objectTextLabel,
      bounding_left: objectBoundingLeft,
      bounding_top: objectBoundingTop,
      bounding_right: objectBoundingRight,
      bounding_bottom: objectBoundingBottom,
      confidence: objectConfidence
    } = row;
    data.push({objectTextLabel,
      objectBoundingLeft,
      objectBoundingTop,
      objectBoundingRight,
      objectBoundingBottom,
      objectConfidence});
  });
  return data;
};

export {
  mapBBResults
};
