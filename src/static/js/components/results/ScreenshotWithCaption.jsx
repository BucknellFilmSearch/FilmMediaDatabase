import * as React from "react";
import {DEBUG_MODE} from "../../app.jsx";

import {connect} from 'react-redux'
import {GridTile} from 'material-ui/GridList';

import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@connect(mapStateToProps, mapDispatchToProps)
export default class ScreenshotWithCaption extends React.Component {

    render() {

        let imgSrc =
            // DEBUG_MODE ? "/static/imageFiles/720x480.jpg" :
            "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + this.props.movieOclcId + "/" + this.props.screenshotDetails.movieLineNumber + ".png";
        
        return (
            <GridTile
                style={{'height': '180px'}}
                title={this.props.screenshotDetails.movieLineNumber}
                titleBackground={'rgba(0, 0, 0, 0.3)'}
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
                             onMouseLeave={() => this.props.onMouseLeaveScreenshot()}
                             onClick={() => this.props.onClickScreenshot()}
                        />
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

const mouseLeaveScreenshot = () => {
    return {
        type: 'MOUSE_LEAVE_SCREENSHOT'
    };
};

const clickScreenshot = (movieOclcId, movieLineNumber) => {
    return {
        type: 'CLICK_SCREENSHOT',
        movieOclcId,
        movieLineNumber
    }
};

// Map Redux state to component props
function mapStateToProps(state) {
    return {}
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch, screenshotProps) {
    return {
        onMouseEnterScreenshot: () => dispatch(mouseEnterScreenshot(screenshotProps.movieOclcId, screenshotProps.screenshotDetails.movieLineNumber)),
        onMouseLeaveScreenshot: () => dispatch(mouseLeaveScreenshot()),
        onClickScreenshot: () => dispatch(clickScreenshot(screenshotProps.movieOclcId, screenshotProps.screenshotDetails.movieLineNumber))
    }
}
