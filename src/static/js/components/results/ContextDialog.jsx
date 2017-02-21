import * as React from 'react';
import ImageGallery from 'react-image-gallery';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router'


const customContentStyle = {
    width: '90%',
    maxWidth: 'none',
    textAlign: 'center'
};



/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */

const timeLineLength = 200;

class ContextDialog extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false
        };

        this.handleClose = this.handleClose.bind(this);
    }

    /* Removes the junk after the comma in the screenshot's timestamp */
    static beautifyTimeStamp(movieStartTimeStamp) {
        const splitString = movieStartTimeStamp.split(",");
        return (splitString[0]);
    }

    static timeStampToMinutes(movieStartTimeStamp, totalMovieRuntime) {
        const splitString = movieStartTimeStamp.split(":");
        return Math.ceil((10 + parseInt(splitString[0]) * 60 + parseInt(splitString[1]))/totalMovieRuntime*timeLineLength);
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({open: false});
        hashHistory.push(`/${this.props.searchTerm}`)
    }

    componentWillReceiveProps(nextProps) {
        // open the context dialog if screenshot is clicked or URL is updated
        if (this.state.open === false && nextProps.contextScreenshotMovieOclcId !== null) {
            this.handleOpen();
        }
    }


    render() {

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];

        let totalNumberOfLines = this.props.currentFilm === null ? 0 : this.props.currentFilm.totalNumberOfLines;

        let images = [...Array(totalNumberOfLines).keys()].map(screenshotNumber => ({
            original: `http://www.filmtvsearch.net/static/imageFiles/screenshots/${this.props.contextScreenshotMovieOclcId}/${screenshotNumber+1}.png`,
            // thumbnail: `http://www.filmtvsearch.net/static/imageFiles/screenshots/${this.props.contextScreenshotMovieOclcId}/${screenshotNumber+1}.png`
            // TODO - add thumbnail back when pull request is approved (https://github.com/xiaolin/react-image-gallery/pull/147)
        }));

        return (
            <Dialog
                actions={actions}
                contentStyle={customContentStyle}
                modal={false}
                open={this.state.open}
                autoScrollBodyContent={true}
                onRequestClose={this.handleClose}
            >

                <div className="contextImageGallery">
                    <ImageGallery
                        items={images}
                        slideInterval={2000}
                        lazyLoad={true}
                        showIndex={true}
                        startIndex={this.props.currentMovieLineNumber-1}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        onSlide={this.props.onSlideAndCheckForContext}
                    />
                </div>



                <div className="contextDialogue">

                    {this.props.currentScreenshot != null ? (
                            <div>
                                {this.props.currentScreenshot.movieLineText} <br />
                                {ContextDialog.beautifyTimeStamp(this.props.currentScreenshot.movieStartTimeStamp)}<br/>
                            </div>
                        ): (
                            <div>
                                Loading Context...
                            </div>
                        )

                    }

                </div>
                {this.props.currentScreenshot != null ? (
                <svg height="70" width="200">
                    <line x1="10" y1="50" x2="210" y2="50" stroke={"grey"} strokeWidth={1} />
                    <line x1={ContextDialog.timeStampToMinutes(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y1="30" x2={ContextDialog.timeStampToMinutes(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y2="65" stroke={"gray"} strokeWidth={1}/>
                </svg>
                ): null }


            </Dialog>
        );
    }
}

const slideScreenshot = (newMovieLineNumber) => {
    return {
        type: 'SLIDE_SCREENSHOT',
        newMovieLineNumber
    };
};

const receiveContext = (context) => {
    return {
        type: 'RECEIVE_CONTEXT',
        movieOclcId: context.movieOclcId,
        context: context.results
    };
};

const slideAndCheckForContext = (newMovieLineNumberIndex) => {
    return (dispatch, getState) => {

        let state = getState();

        let currentFilm = !state.contextScreenshotMovieOclcId ? null :
            state.search.response.find(film => state.contextScreenshotMovieOclcId === film.movieOclcId);

        let context = state.context;

        let newMovieLineNumber = newMovieLineNumberIndex + 1;

        // check if context already exists
        let newMovieLineNumberNotInContext = context.find(screenshot =>
            screenshot.key == `oclc${currentFilm.movieOclcId}line${newMovieLineNumber}`) === undefined;

        dispatch(slideScreenshot(newMovieLineNumber));

        // make API call if screenshot does not exist
        if (newMovieLineNumberNotInContext) {
            return fetch(`/moviesearch/context/${currentFilm.movieOclcId}/${newMovieLineNumber}`)
                .then(response => response.json())
                .then(response => response.context)
                .then(response => dispatch(receiveContext(response)));
            // TODO - add catch handler to handle errors
        }

    }
};


// Map Redux state to component props
function mapStateToProps(state) {
    console.log(state);

    let currentFilm = !state.contextScreenshotMovieOclcId ? null :
        state.search.response.find(film => state.contextScreenshotMovieOclcId === film.movieOclcId);

    let key = `oclc${state.contextScreenshotMovieOclcId}line${state.currentContextMovieLineNumber}`;

    let currentScreenshot = state.context.find(screenshot => (screenshot.key == key)) || null;

    return {
        contextScreenshotMovieOclcId: state.contextScreenshotMovieOclcId,
        currentMovieLineNumber: state.currentContextMovieLineNumber,
        currentFilm: currentFilm,
        currentScreenshot: currentScreenshot,
        searchTerm: state.search && state.search.searchTerm ? state.search.searchTerm : null
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        // TODO - update url to remove context on close
        // onCloseContextDialog: () => dispatch(closeContextDialog()),
        onSlideAndCheckForContext: (newMovieLineNumberIndex) => dispatch(slideAndCheckForContext(newMovieLineNumberIndex))
    }
}

export const ConnectedContextDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContextDialog);