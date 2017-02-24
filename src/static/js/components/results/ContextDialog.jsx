import * as React from 'react';
import Slider from 'react-slick';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import FullscreenDialog from 'material-ui-fullscreen-dialog'

const timeLineLength = 200;

const LeftArrow = (props) => (
    <IconButton>
        <SvgIcon onClick={props.onClick}>
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
            <path d="M0-.5h24v24H0z" fill="none"/>
        </SvgIcon>
    </IconButton>
);

const RightArrow = (props) => (
    <IconButton>
        <SvgIcon onClick={props.onClick}>
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
            <path d="M0-.25h24v24H0z" fill="none"/>
        </SvgIcon>
    </IconButton>
);

const CloseButton = (props) => (
    <IconButton>
        <SvgIcon onClick={props.onClick}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        </SvgIcon>
    </IconButton>
);

@connect(mapStateToProps, mapDispatchToProps)
export default class ContextDialog extends React.Component {

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
        this.props.onCloseContextDialog();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.open === false && nextProps.clickedScreenshotMovieOclcId !== null) {
            console.log('opening');
            this.handleOpen();
        }
    }

    svgTest() {
        alert('clicked!');
    }


    render() {

        return (
            <FullscreenDialog
                title={'Context'}
                open={this.state.open}
                closeIcon={<CloseButton />}
                onRequestClose={this.handleClose}
            >

                <div className="contextImageGallery">
                    <Slider
                        dots={false}
                        speed={500}
                        slidesToShow={3}
                        slidesToScroll={1}
                        infinite={true}
                        initialSlide={this.props.currentMovieLineNumber - 1}
                        afterChange={this.props.onSlideAndCheckForContext}
                        nextArrow={<RightArrow />}
                        prevArrow={<LeftArrow />}
                        lazyLoad={true}
                        centerMode={true}
                    >

                            { this.props.images.map(imageUrl => <img key={imageUrl} src={imageUrl}/>) }

                    </Slider>
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
                    <line onClick={() => {alert('test')}} x1={ContextDialog.timeStampToMinutes(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y1="30" x2={ContextDialog.timeStampToMinutes(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y2="65" stroke={"gray"} strokeWidth={20}/>
                </svg>
                ): null }
                {/*<svg>*/}
                    {/*<circle onClick={() => {alert('hi')}} cx={100} cy={100} r={50} fill="red" />*/}
                {/*</svg>*/}


            </FullscreenDialog>
        );
    }
}


const closeContextDialog = () => {
    return {
        type: 'CLOSE_CONTEXT_DIALOG'
    };
};

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

        let currentFilm = !state.clickedScreenshotMovieOclcId ? null :
            state.search.response.find(film => state.clickedScreenshotMovieOclcId === film.movieOclcId);

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

const getContext = (state) => state.context;

const getClickedScreenshotMovieOclcId = (state) => state.clickedScreenshotMovieOclcId;

const getCurrentContextMovieLineNumber = (state) => state.currentContextMovieLineNumber;

const getSearchResponse = (state) => state.search && state.search.response;

const getCurrentFilm = createSelector(
    [ getClickedScreenshotMovieOclcId, getSearchResponse ],
    (clickedScreenshotMovieOclcId, searchResponse) => {
        return !clickedScreenshotMovieOclcId ? null :
            searchResponse.find(film => clickedScreenshotMovieOclcId === film.movieOclcId)
    }
);

const getCurrentScreenshot = createSelector(
    [ getClickedScreenshotMovieOclcId, getCurrentContextMovieLineNumber, getContext ],
    (clickedScreenshotMovieOclcId, currentContextMovieLineNumber, context) => {
        let key = `oclc${clickedScreenshotMovieOclcId}line${currentContextMovieLineNumber}`;
        return context.find(screenshot => (screenshot.key == key)) || null;
    }
);

const getImages = createSelector(
    [ getClickedScreenshotMovieOclcId, getCurrentFilm ],
    (clickedScreenshotMovieOclcId, currentFilm) => {
        let totalNumberOfLines = currentFilm === null ? 0 : currentFilm.totalNumberOfLines;

        return [...Array(totalNumberOfLines).keys()].map(screenshotNumber =>
            `http://www.filmtvsearch.net/static/imageFiles/screenshots/${clickedScreenshotMovieOclcId}/${screenshotNumber+1}.png`
        );
    }
);


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        clickedScreenshotMovieOclcId: getClickedScreenshotMovieOclcId(state),
        currentMovieLineNumber: getCurrentContextMovieLineNumber(state),
        currentFilm: getCurrentFilm(state),
        currentScreenshot: getCurrentScreenshot(state),
        images: getImages(state)
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onCloseContextDialog: () => dispatch(closeContextDialog()),
        onSlideAndCheckForContext: (newMovieLineNumberIndex) => dispatch(slideAndCheckForContext(newMovieLineNumberIndex))
    }
}
