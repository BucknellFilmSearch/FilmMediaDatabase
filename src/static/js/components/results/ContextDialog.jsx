import * as React from 'react';
import Slider from 'react-slick';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import SVGLine from './SVGLine.jsx';
import {GridTile} from 'material-ui/GridList';
import SVGCircle from './SVGCircle.jsx';
import ReactTooltip from 'react-tooltip';
import { hashHistory } from 'react-router'


const TIME_LINE_LENGTH = 1150;
const STROKE_WIDTH = 3;
const CIRCLE_RADIUS = 7;
const MIN_DIST = 2*STROKE_WIDTH;

SVGLine.propTypes = {
    slideTo: React.PropTypes.func,
};

const customContentStyle = {
    width: '90%',
    maxWidth: 'none',
    textAlign: 'center'
};


const LeftArrow = (props) => (
    <IconButton onClick={props.onClick}>
        <SvgIcon>
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
            <path d="M0-.5h24v24H0z" fill="none"/>
        </SvgIcon>
    </IconButton>
);

const RightArrow = (props) => (
    <IconButton onClick={props.onClick}>
        <SvgIcon>
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
            <path d="M0-.25h24v24H0z" fill="none"/>
        </SvgIcon>
    </IconButton>
);

// const CloseButton = (props) => (
//     <IconButton onClick={props.onClick}>
//         <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24">
//             <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
//             <path d="M0 0h24v24H0z" fill="none"/>
//         </svg>
//     </IconButton>
// );

@connect(mapStateToProps, mapDispatchToProps)
export default class ContextDialog extends React.Component {

    constructor() {
        super();

        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            open: false
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleKeyPress(e) {
        if(e.keyCode === 27) {
            this.handleClose();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        this.setState({open: true});
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    /* Removes the junk after the comma in the screenshot's timestamp */
    static beautifyTimeStamp(movieStartTimeStamp) {
        const splitString = movieStartTimeStamp.split(",");
        return (splitString[0]);
    }

    static timeStampToSeconds(movieStartTimeStamp, totalMovieRuntime) {
        const splitString = movieStartTimeStamp.split(":");
        alert(Math.ceil((parseInt(splitString[0]) * 3600 + parseInt(splitString[1])*60)/(totalMovieRuntime*60)*(TIME_LINE_LENGTH-CIRCLE_RADIUS-2))+CIRCLE_RADIUS+2);
        return Math.ceil((parseInt(splitString[0]) * 3600 + parseInt(splitString[1])*60)/(totalMovieRuntime*60)*(TIME_LINE_LENGTH-CIRCLE_RADIUS-2))+CIRCLE_RADIUS+2;
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({open: false});
        hashHistory.push(`${this.props.searchTerm}`)
    }

    componentWillReceiveProps(nextProps) {
        // open the context dialog if screenshot is clicked or URL is updated
        if (this.state.open === false && nextProps.contextScreenshotMovieOclcId !== null) {
            this.handleOpen();
        }
    }

    svgTest(index) {
        this.refs.slider.slickGoTo(index);
    }

    getScreenShotTimes() {
        // let state = getState();
        //
        // let currentFilm = !state.clickedScreenshotMovieOclcId ? null :
        //     state.search.response.find(film => state.clickedScreenshotMovieOclcId === film.movieOclcId);
        // let totalNumberOfLines = currentFilm === null ? 0 : currentFilm.totalNumberOfLines;
        // let results = currentFilm.results;
        // var svgLines = [];
        // var lastPosition = 0;
        // var newX = 0;
        // var currentTimeStampInSeconds = 0;
        // for (var i = 0; i < this.props.currentFilm.results.length; i++) {
        //     currentTimeStampInSeconds = ContextDialog.timeStampToSeconds(
        //         this.props.currentFilm.results[i].movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes);
        //     newX = currentTimeStampInSeconds - lastPosition < MIN_DIST ? lastPosition + MIN_DIST : currentTimeStampInSeconds;
        //     lastPosition = newX;
        //     svgLines.push(
        //         <SVGLine
        //         slideTo={this.svgTest.bind(this)}
        //         index={this.props.currentFilm.results[i].movieLineNumber-1}
        //         x={newX}
        //         y1="30"
        //         y2="65"
        //         stroke={"gray"}
        //         strokeWidth={1}/>);
        //
        // }
            // const svgLines = this.props.currentFilm.results.map(
                // (result) =>
                //     <SVGLine
                //         slideTo={this.svgTest.bind(this)}
                //         index={result.movieLineNumber-1}
                //         x={ContextDialog.timeStampToSeconds(result.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)}
                //         y1="30"
                //         y2="65"
                //         stroke={"gray"}
                //         strokeWidth={1}/>)
        const svgLines = this.props.currentFilm.results.map((result) =>
            <SVGCircle
                slideTo={this.svgTest.bind(this)}
                index={result.movieLineNumber-1}
                key={`screenshot${result.movieLineNumber}`}
                x={Math.ceil((result.movieLineNumber-1)/(this.props.currentFilm.totalNumberOfLines)*(TIME_LINE_LENGTH))+CIRCLE_RADIUS+STROKE_WIDTH}
                y="50"
                radius={CIRCLE_RADIUS}
                stroke={"gray"}
                strokeWidth={1}
            />
        );

        return svgLines;

    }

    createImageTooltip() {
        return this.props.currentFilm.results.map((result) =>
            <ReactTooltip
                id={'SVGCircle' + (result.movieLineNumber - 1)}
                aria-haspopup='true'
                role='example'
                key={`tooltip${result.movieLineNumber}`}
            >
                <img height='100' src={"http://www.filmtvsearch.net/static/imageFiles/screenshots/" + this.props.currentFilm.movieOclcId + "/" + result.movieLineNumber + ".png"}/>
            </ReactTooltip>
            );
    }

    render() {

        return (
            <FullscreenDialog
                title={`${this.props.currentFilm && this.props.currentFilm.results.length} Results in "${this.props.currentFilm && this.props.currentFilm.movieTitle}"`}
                open={this.state.open}
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
                        ref="slider"
                    >

                        { this.props.images.map(imageNumber =>
                            <GridTile className="contextImage"
                                title={imageNumber}
                                titleBackground={'rgba(0, 0, 0, 0.3)'}
                                key={`img${imageNumber}`}
                            >
                                <img src={`http://www.filmtvsearch.net/static/imageFiles/screenshots/${this.props.currentFilm.movieOclcId}/${imageNumber}.png`}/>
                            </GridTile>
                            )
                        }

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

                <div className="ContextTimeLine">
                {this.props.currentFilm != null ? (
                    <div>
                <svg height="70" width={TIME_LINE_LENGTH + 2*(CIRCLE_RADIUS + 5)}>
                    <line x1={CIRCLE_RADIUS} y1="50" x2={10+TIME_LINE_LENGTH} y2="50" stroke={"grey"} strokeWidth={1} />
                    {/*<line onClick={() => {this.props.onSlideAndCheckForContext(10)}} x1={ContextDialog.timeStampToMinutes(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y1="30" x2={ContextDialog.timeStampToMinutes(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y2="65" stroke={"gray"} strokeWidth={20}/>*/}
                    {/*<line onClick={() => {this.svgTest()}} x1={ContextDialog.timeStampToMinutes(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y1="30" x2={ContextDialog.timeStampToMinutes(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y2="65" stroke={"gray"} strokeWidth={20}/>*/}
                    {/*<SVGLine slideTo={this.svgTest.bind(this)} index={20} x={ContextDialog.timeStampToSeconds(this.props.currentScreenshot.movieStartTimeStamp, this.props.currentFilm.runtimeInMinutes)} y1="30" y2="65" stroke={"gray"} strokeWidth={1}/>*/}
                    {this.getScreenShotTimes()}
                    {this.props.currentScreenshot != null ? (
                        <line
                            x1={Math.ceil((this.props.currentScreenshot.movieLineNumber-1)/this.props.currentFilm.totalNumberOfLines*TIME_LINE_LENGTH)+CIRCLE_RADIUS+STROKE_WIDTH}
                            x2={Math.ceil((this.props.currentScreenshot.movieLineNumber-1)/this.props.currentFilm.totalNumberOfLines*TIME_LINE_LENGTH)+CIRCLE_RADIUS+STROKE_WIDTH}
                            y1="35"
                            y2="65"
                            strokeWidth={2}
                            stroke={"black"}
                        />
                    ): null }

                </svg>
                        {this.createImageTooltip()}
                    </div>
                ): null }

                </div>
                {/*<svg>*/}
                    {/*<circle onClick={() => {alert('hi')}} cx={100} cy={100} r={50} fill="red" />*/}
                {/*</svg>*/}


            </FullscreenDialog>
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

const getContext = (state) => state.context;

const getClickedScreenshotMovieOclcId = (state) => state.contextMovieOclcId;

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

        return [...Array(totalNumberOfLines).keys()].map(screenshotNumber => screenshotNumber+1);
    }
);

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        contextScreenshotMovieOclcId: getClickedScreenshotMovieOclcId(state),
        currentMovieLineNumber: getCurrentContextMovieLineNumber(state),
        currentFilm: getCurrentFilm(state),
        currentScreenshot: getCurrentScreenshot(state),
        images: getImages(state),
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
