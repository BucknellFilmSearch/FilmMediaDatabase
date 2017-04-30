/**
 * This file generates screenshots and maps them with their corresponding lines of dialogue.
 * It's used by IndividualFilmResults file.
 */

import * as React from "react";
import {connect} from 'react-redux'
import {GridTile} from 'material-ui/GridList';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hashHistory } from 'react-router'


/**
 * The ScreenshotWithCaption maps the screenshot image of a film with its corresponding
 * line of dialogue. On Click, it connects to the redux store so it can send its movieOclcId
 * and movieLineNumber.
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class ScreenshotWithCaption extends React.Component {

    /* Removes the junk after the comma in the screenshot's timestamp */
    static beautifyTimeStamp(movieStartTimeStamp) {
        const splitString = movieStartTimeStamp.split(",");
        return (splitString[0]);
    }

    /**
     * Render the ScreenshotWithCaption
     */
    render() {

        let imgSrc =
            "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + this.props.movieOclcId + "/" + this.props.screenshotDetails.movieLineNumber + ".png";
        
        return (
            <GridTile
                style={{'height': '180px'}}
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
                        <img src={imgSrc} height={'180px'}
                             onMouseEnter={() => this.props.onMouseEnterScreenshot()}
                             onClick={() => hashHistory.push(`${this.props.searchTerm}/context/${this.props.movieOclcId}/${this.props.screenshotDetails.movieLineNumber}`)}                        />
                    </ReactCSSTransitionGroup>
                </LazyLoad>
            </GridTile>
        )
    }

}


/**
 * Redux action for when the user mouses over a screenshot, which is used to populate the MetadataDrawer
 * @param movieOclcId The movieOclcId corresponding to the hovered screenshot
 * @param movieLineNumber The movieLineNumber corresponding to the hovered screenshot
 */
const mouseEnterScreenshot = (movieOclcId, movieLineNumber) => {
    return {
        type: 'MOUSE_ENTER_SCREENSHOT',
        movieOclcId,
        movieLineNumber
    }
};

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        searchTerm: state.search && state.search.searchTerm ? state.search.searchTerm : null
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch, screenshotProps) {
    return {
        onMouseEnterScreenshot: () => dispatch(mouseEnterScreenshot(screenshotProps.movieOclcId, screenshotProps.screenshotDetails.movieLineNumber))
    }
}