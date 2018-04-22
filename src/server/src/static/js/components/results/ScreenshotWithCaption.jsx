/**
 * This file generates screenshots and maps them with their corresponding lines of dialogue.
 * It is used by the IndividualFilmResults file.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */

import * as React from 'react';
import {connect} from 'react-redux';
import {GridTile} from 'material-ui/GridList';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hashHistory } from 'react-router';


/**
 * The ScreenshotWithCaption maps the screenshot image of a film with its corresponding
 * line of dialogue. On Click, it connects to the redux store so it can send its movieOclcId
 * and movieLineNumber.
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class ScreenshotWithCaption extends React.Component {

    /* Removes the junk after the comma in the screenshot's timestamp */
  static beautifyTimeStamp(movieStartTimeStamp) {
    const splitString = movieStartTimeStamp.split(',');
    return (splitString[0]);
  }

  render() {

    let imgSrc = `${process.env.IMG_SRC}${this.props.movieOclcId}/${this.props.screenshotDetails.movieLineNumber}.png`;

    return (
      <GridTile
        style={{'height': '180px', objectFit: 'fill'}}
        title={ScreenshotWithCaption.beautifyTimeStamp(this.props.screenshotDetails.movieStartTimeStamp)}
        titleBackground={'rgba(0, 0, 0, 0.3)'}
        className="screenshot"
      >
        <LazyLoad height={180}>
          <ReactCSSTransitionGroup
            key="1"
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={5000}
            transitionEnter={false}
            transitionLeave={false}
          >
            <img src={imgSrc}
              width={'100%'}
              onMouseEnter={() => this.props.onMouseEnterScreenshot()}
              onClick={() => hashHistory.push(`${this.props.searchType}/${this.props.searchTerm}/context/${this.props.movieOclcId}/${this.props.screenshotDetails.movieLineNumber}?confidence=${this.props.confidence}`)} />
          </ReactCSSTransitionGroup>
        </LazyLoad>
      </GridTile>
    );
  }

}


/**
 * Redux action for when the user mouses over a screenshot, which is used to populate the MetadataDrawer
 * @param {number} movieOclcId The movieOclcId corresponding to the hovered screenshot
 * @param {number} movieLineNumber The movieLineNumber corresponding to the hovered screenshot
 * @returns {object} A redux action for when the mouse enters a screenshot
 */
const mouseEnterScreenshot = (movieOclcId, movieLineNumber) => {
  return {
    type: 'MOUSE_ENTER_SCREENSHOT',
    movieOclcId,
    movieLineNumber
  };
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    confidence: state.confidence,
    searchType: state.searchType,
    searchTerm: state.search && state.search.searchTerm ? state.search.searchTerm : null
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch, screenshotProps) {
  return {
    onMouseEnterScreenshot: () => dispatch(mouseEnterScreenshot(screenshotProps.movieOclcId, screenshotProps.screenshotDetails.movieLineNumber))
  };
}
