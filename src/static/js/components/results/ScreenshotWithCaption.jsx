import * as React from "react";
import {DEBUG_MODE} from "../../app.jsx";

import {connect} from 'react-redux'
import {GridTile} from 'material-ui/GridList';

import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hashHistory } from 'react-router'

@connect(mapStateToProps, mapDispatchToProps)
export default class ScreenshotWithCaption extends React.Component {

    /* Removes the junk after the comma in the screenshot's timestamp */
    static beautifyTimeStamp(movieStartTimeStamp) {
        const splitString = movieStartTimeStamp.split(",");
        return (splitString[0]);
    }

    render() {

        let imgSrc =
            // DEBUG_MODE ? "/static/imageFiles/720x480.jpg" :
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
