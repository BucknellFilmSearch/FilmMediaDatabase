/**
 * This file is used to generate a gallery of screenshots before and after the
 * screenshot a user clicks on.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */


import renderHTML from 'react-render-html';
import * as React from 'react';
import Slider from 'react-slick';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import FullscreenDialog from 'material-ui-fullscreen-dialog';
import {GridTile} from 'material-ui/GridList';
import SVGCircle from './SVGCircle.jsx';
import ReactTooltip from 'react-tooltip';
import RaisedButton from 'material-ui/RaisedButton';
import BoundingBox from 'react-bounding-box';
import _ from 'lodash';
import {beautifyTimeStamp} from '../helpers';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const TIME_LINE_LENGTH = 1150;
const STROKE_WIDTH = 3;
const CIRCLE_RADIUS = 7;


const style = {
    margin: 12,
};


/**
 * Uses the Material-UI dialog to display screenshots before and after the screenshot
 * a user selects. Uses a gallery component to display the screenshots and connects
 * to the Redux store to know when a user clicks on a screenshot or browses through
 * screenshots in the context.
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class ContextDialog extends React.Component {

    /**
     * Initializes the state and binds event handlers to the class.
     */
    constructor() {
        super();

        // state is initialized to keeping the dialog closed
        this.state = {
            open: false,
            boxes: [],
            showBoundingBoxes: true
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.contextDialogueColorSearch = this.contextDialogueColorSearch.bind(this);
        this.slideLeft = this.slideLeft.bind(this);
        this.slideRight = this.slideRight.bind(this);
        this.toggleBoundingBoxes = this.toggleBoundingBoxes.bind(this);
    }

    /**
     * Closes the dialog if the user presses the Escape key.
     *
     * @param e React synthetic event
     */
    handleKeyPress(e) {
        const ESCAPE_KEY = 27;

        if(e.keyCode === ESCAPE_KEY) {
            this.handleClose();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        this.retrieveBoundingBoxes(this.props.currentFilm.movieOclcId, this.props.currentScreenshot.movieLineNumber);
        this.setState({open: true});
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({open: false});
         window.history.back();
    }

    componentWillReceiveProps(nextProps) {
        // open the context dialog if screenshot is clicked or URL is updated
        if (this.state.open === false && nextProps.contextScreenshotMovieOclcId !== null) {
            this.retrieveBoundingBoxes(this.props.currentFilm.movieOclcId, this.props.currentScreenshot.movieLineNumber);
            this.handleOpen();
        }
    }

    toggleBoundingBoxes(event, checked){
      this.setState({showBoundingBoxes: checked}, () => {
        if(this.state.showBoundingBoxes){

        }
        else{

        }
      });
    }


    /**
     * Slides the image gallery to the specified index
     * @param index An integer that represents the screenshot to slide
     * to in the image gallery.
     */
    svgSlideTo(index) {
        this.retrieveBoundingBoxes(this.props.currentFilm.movieOclcId, index)
        this.refs.slider.slickGoTo(index);
    }

    /**
     * Slides the image gallery one to the left if able
     */
    slideLeft() {
        if (this.props.currentScreenshot != null) {
            this.retrieveBoundingBoxes(this.props.currentFilm.movieOclcId, this.props.currentScreenshot.movieLineNumber-1)
            this.refs.slider.slickGoTo(this.props.currentScreenshot.movieLineNumber-2);
        }
    }

    /**
     * Slides the image gallery one to the right if able
     */
    slideRight() {
        if (this.props.currentScreenshot != null) {
            this.retrieveBoundingBoxes(this.props.currentFilm.movieOclcId, this.props.currentScreenshot.movieLineNumber+1)
            this.refs.slider.slickGoTo(this.props.currentScreenshot.movieLineNumber);
        }
    }

    /**
     * Instantiates and maps each time line circle to a screenshot in the results page
     * for the current film and sets the x position of the circle based on the
     * timestamp of the mapped screenshot.
     * @returns {array of SVGCircle elements} The click-able time line circles
     */
    getScreenShotTimes() {
        return this.props.currentFilm.results.map((result) =>
            <SVGCircle
                slideTo={this.svgSlideTo.bind(this)}
                index={result.movieLineNumber-1}
                key={`screenshot${result.movieLineNumber}`}
                x={Math.ceil((result.movieLineNumber-1)/(this.props.currentFilm.totalNumberOfLines)*(TIME_LINE_LENGTH))+CIRCLE_RADIUS+STROKE_WIDTH}
                y="50"
                radius={CIRCLE_RADIUS}
                stroke={"gray"}
                strokeWidth={1}
            />
        );
    }

    /**
     * Instantiates all ReactTooltip elements and maps them to both
     * the correct SVGCircle element and the corresponding screenshot.
     * @returns {array of ReactTooltip elements} All the image tooltips for the time line circles.
     */
    createImageTooltips() {
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

    /**
     * Makes a call to the color search API by updating the
     * URL. Performs the color search that is done on the
     * Context Page.
     */
    contextDialogueColorSearch() {
        let newPath = '/'+this.props.currentFilm.movieOclcId+'/'+this.props.currentScreenshot.movieLineNumber;
        hashHistory.push(newPath);
    }

    retrieveBoundingBoxes(oclcId, lineNo) {
        const bBoxApiCall = `http://localhost:8080/api/boundingbox/${oclcId}/${lineNo}`;
        fetch(bBoxApiCall)
        .then((res) => res.json())
        .then((res) => {
            console.log(res.results);
            const newBox = { boxes: {} };
            newBox.boxes[`${oclcId}-${lineNo}`] = _.map(_.filter(res.results, res => res.textLabel === this.props.searchTerm), res => res.bounding)
            this.setState(newBox, () => console.log(this.state));
        })
        .catch((err) => {
            console.error(err.message);
        });
    }

    /**
     * Render the context page.
     */
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
                        infinite={false}
                        initialSlide={this.props.currentMovieLineNumber - 1}
                        afterChange={this.props.onSlideAndCheckForContext}
                        nextArrow={null}
                        prevArrow={null}
                        lazyLoad={true}
                        centerMode={true}
                        preLoad={6}
                        focusOnSelect={true}
                        ref="slider"
                    >

                        { this.props.images.map(imageNumber =>
                            <GridTile className="contextImage"
                                titleBackground={'rgba(0, 0, 0, 0.3)'}
                                key={`img${imageNumber}`}
                            >
                                <BoundingBox
                                  image={`http://www.filmtvsearch.net/static/imageFiles/screenshots/${this.props.currentFilm.movieOclcId}/${imageNumber}.png`}
                                  boxes={this.state.boxes[`${this.props.currentFilm.movieOclcId}-${imageNumber}`] || []}
                                />
                            </GridTile>
                            )
                        }

                    </Slider>
                </div>

                <div className="contextDialogue">
                    <div>
                      <Checkbox
                          checkedIcon={<Visibility />}
                          uncheckedIcon={<VisibilityOff />}
                          defaultChecked={true}
                          label="Bounding Boxes"
                          style={{
                              display: 'inline-block',
                              width: '200px',
                              fontSize: '16px'
                            }}
                          checked={this.state.showBoundingBoxes}
                          onCheck={this.toggleBoundingBoxes}
                      />
                    </div>
                    <IconButton onClick={this.slideLeft}>
                        <SvgIcon>
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </SvgIcon>
                    </IconButton>
                    <IconButton onClick={this.slideRight}>
                        <SvgIcon>
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </SvgIcon>
                    </IconButton>

                    {this.props.currentScreenshot != null ? (
                            <div>
                                {renderHTML(this.props.currentScreenshot.movieLineText)} <br />
                                {beautifyTimeStamp(this.props.currentScreenshot.movieStartTimeStamp)}<br/>
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
                        {this.createImageTooltips()}
                    </div>
                ): null }

                </div>
                <div className="colorSearchButton" >
                    <RaisedButton onClick={this.contextDialogueColorSearch} label="Color Search" style={style} />
                </div>

            </FullscreenDialog>
        );
    }
}


/**
 * Redux event that handles changing the current screenshot in the gallery.
 * @param newMovieLineNumber The movie line number to change to
 */
const slideScreenshot = (newMovieLineNumber) => {
    return {
        type: 'SLIDE_SCREENSHOT',
        newMovieLineNumber
    };
};


/**
 * Redux event that receiving context from an API call.
 * @param context The context received from the API call
 */
const receiveContext = (context) => {
    return {
        type: 'RECEIVE_CONTEXT',
        movieOclcId: context.movieOclcId,
        context: context.results
    };
};


/**
 * Handler function that is called by the image gallery when the current movie line number is changed.
 * Updates the Redux store with the new line number and makes an API call for the new line number
 * if it does not already exist in the database.
 * @param newMovieLineNumberIndex The new movie line number
 */
const slideAndCheckForContext = (newMovieLineNumberIndex) => {
    return (dispatch, getState) => {
        let state = getState();

        let currentFilm = !state.contextMovieOclcId ? null :
            state.search.response.find(film => state.contextMovieOclcId === film.movieOclcId);

        let context = state.context;

        let newMovieLineNumber = newMovieLineNumberIndex + 1;

        // check if context already exists
        let newMovieLineNumberNotInContext = context.find(screenshot =>
            screenshot.key == `oclc${currentFilm.movieOclcId}line${newMovieLineNumber}`) === undefined;

        dispatch(slideScreenshot(newMovieLineNumber));

        // make API call if screenshot does not exist
        if (newMovieLineNumberNotInContext) {
            return fetch(`/api/moviesearch/context/${currentFilm.movieOclcId}/${newMovieLineNumber}`)
                .then(response => response.json())
                .then(response => response.context)
                .then(response => dispatch(receiveContext(response)));
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
        onSlideAndCheckForContext: (newMovieLineNumberIndex) => dispatch(slideAndCheckForContext(newMovieLineNumberIndex))
    }
}
