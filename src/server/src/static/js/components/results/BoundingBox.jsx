import * as React from 'react';
import _ from 'lodash';

/**
 * Styling for bounding boxes
 */
const styles = {
  fill: {
    width: '100%',
    height: 'auto'
  },
  box: (x = 0, y = 0, width = 0, height = 0, scale = 1) => {
    return {
      position: 'absolute',
      left: `${x * scale}px`,
      top: `${y * scale}px`,
      width: `${width * scale}px`,
      height: `${height * scale}px`
    };
  }
};

export default class BoundingBox extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      scale: 1
    };

    // Bind methods
    this.onImgLoad = this.onImgLoad.bind(this);
    this.onSelectBox = this.onSelectBox.bind(this);
  }

  onImgLoad(target) {
    // Set scaling for drawing bounding boxes
    this.setState({scale: target.clientWidth / target.naturalWidth});
  }

  onSelectBox(id) {
    // Handle box selection
    this.props.onSelectBox(id, this.props.display);
  }

  /**
   * Render the bounding boxes specified. The formatting of a bounding box is:
   * {
   *   textLabel: <value>
   *   confidence: <value>
   *   bounding: [ <x>, <y>, <w>, <h> ]
   * }
   * @param {*} boxes The bounding boxes and labels to draw
   * @returns {object} The JSX object representing this class
   */
  getBoxes(boxes) {
    // Sort the boxes so the smallest area goes on top and create the divs for them
    return _(boxes.sort(({bounding: a}, {bounding: b}) => b[2] * b[3] - a[2] * a[3]))
      .filter(box => box.confidence >= this.props.confidenc || 0.8)
      .map(({bounding: box, textLabel: label, id}, idx) => {
        return (
        <div
          key={idx}
          className={
            'bounding-box'
            + (this.props.selectedBox === id ? ' bounding-box-selected' : '')
            + (this.props.display === false ? ' bounding-box-hidden' : '')
          }
          style={styles.box(box[0], box[1], box[2], box[3], this.state.scale) }
          onClick={() => this.onSelectBox(id)}
          >
            <p className="bounding-box-label">{ _.capitalize(label) }</p>
        </div>
        );
      }).value();
  }

  render() {
    return (
      <div style={styles.fill}>
        <img
          onLoad={({target}) => this.onImgLoad(target)}
          style={styles.fill}
          src={this.props.src}
        />
        {this.getBoxes(this.props.boxes || [])}
      </div>
    );
  }
}
