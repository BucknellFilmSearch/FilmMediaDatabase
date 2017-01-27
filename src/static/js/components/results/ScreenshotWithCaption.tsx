import * as React from "react";
import {DEBUG_MODE} from "../../app";

import {connect} from 'react-redux'
import {GridTile} from 'material-ui/GridList';

class ScreenshotWithCaption extends React.Component<any, {}> {

    render() {
        let movieOclcId = this.props.movieOclcId;
        let imgSrc = DEBUG_MODE ?
            "/static/imageFiles/720x480.jpg" :
            "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + movieOclcId + "/" + this.props.screenshotWithCaption.movieLineNumber + ".png";

        return (
            <GridTile
                title={`Line #${this.props.screenshotWithCaption.movieLineNumber}
                        from ${this.props.screenshotWithCaption.movieStartTimeStamp}
                        to ${this.props.screenshotWithCaption.movieEndTimeStamp}`
                      }
                subtitle={ this.props.screenshotWithCaption.movieLineText }
                style={{'height': '180px'}}>
                onMouseEnter={() => this.props.onMouseEnterScreenshot()}
                onMouseLeave={() => this.props.onMouseLeaveScreenshot()}
                <img src={imgSrc} />

            </GridTile>
        )
    }

}

const mouseEnterScreenshot = (movieOclcId, movieTitle) => {
    return {
        type: 'MOUSE_ENTER_SCREENSHOT',
        movieOclcId,
        movieTitle
    }
};

const mouseLeaveScreenshot = () => {
    return {
        type: 'MOUSE_LEAVE_SCREENSHOT'
    };
};

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        highlight: {
            movieOclcId: state.hoverMovieOclcId,
            movieTitle: state.hoverMovieTitle
        }
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch, screenshotProps) {
    return {
        onMouseEnterScreenshot: () => dispatch(mouseEnterScreenshot(screenshotProps.movieOclcId, screenshotProps.movieTitle)),
        onMouseLeaveScreenshot: () => dispatch(mouseLeaveScreenshot()),
    }
}

export const ConnectedScreenshotWithCaption = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenshotWithCaption);