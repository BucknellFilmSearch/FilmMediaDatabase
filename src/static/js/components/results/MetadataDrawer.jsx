/**
 * This file is used to generate the metadata drawer that is docked to the right side of
 * the film results page. It is used in the AllFilms render function.
 */


import * as React from "react";
import Drawer from 'material-ui/Drawer';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper'
import LazyLoad from 'react-lazyload';
import {createSelector} from 'reselect';


// Horizontal length of the timeline (in pixels)
const timeLineLength = 200;


/**
 * The MetadataDrawer populates a template of film metadata with the film and line of
 * dialogue corresponding to the screenshot the user is currently hovering over.
 * This class connects to the Redux store so it can rerender when the user hovers
 * over a a screenshot.
 */
@connect(mapStateToProps)
export default class MetadataDrawer extends React.Component {

    /**
     * Converts a timestamp to a scaled horizontal offset for the vertical bar in the timeline.
     *
     * @param movieStartTimeStamp A timestamp of a line of dialogue in the format hours:minutes:seconds,milliseconds
     * @param totalMovieRuntime The total runtime of the film, in minutes
     * @return {number} The horizontal offset in pixels
     */
    static timeStampToMinutes(movieStartTimeStamp, totalMovieRuntime) {
        const splitString = movieStartTimeStamp.split(":");
        return Math.ceil((10 + parseInt(splitString[0]) * 60 + parseInt(splitString[1]))/totalMovieRuntime*timeLineLength);
    }


    /**
     * Removes milliseconds in a screenshot's timestamp
     *
     * @param movieStartTimeStamp A timestamp of a line of dialogue in the format hours:minutes:seconds,milliseconds
     * @return {*}  A timestamp of a line of dialogue in the format hours:minutes:seconds
     */
    static beautifyTimeStamp(movieStartTimeStamp) {
        const splitString = movieStartTimeStamp.split(",");
        return (splitString[0]);
    }


    /**
     * Render the metadata using a material-ui template.
     */
    render() {

        let movieDetails = this.props.movieDetails;

        let imgSrc = movieDetails != null ? "http://www.filmtvsearch.net/static/imageFiles/" + movieDetails.movieOclcId + ".gif" : null;
        
        return (
            <Drawer docked={true} open={true} openSecondary={true} zDepth={2} containerStyle={{height: 'calc(100% - 56px)', top: 56}}>
                {movieDetails == null ? (
                        <div>
                            <div className="movieTitleInMetadataDrawer">
                                The Film Search Engine<br />
                            </div>
                            <LazyLoad height={197}>
                                <img className="thumbnail" src={imgSrc} width="140" height="197" />
                            </LazyLoad>
                            <div className="metadataDrawerDialogueContainer">
                                <br /><br />Mouse over an image for details.<br />Click on an image for more options.
                            </div>
                            <Paper>
                                <div className="metadataDrawerTimelineContainer">
                                    <svg height="70" width="200">
                                        <line x1="10" y1="50" x2="210" y2="50" stroke={"grey"} strokeWidth={1} />
                                    </svg>
                                    {MetadataDrawer.beautifyTimeStamp("00:00:00,000")}
                                </div>
                            </Paper>
                        </div>
                    ) : (
                        <div>
                            <div className="movieTitleInMetadataDrawer">
                                {movieDetails.movieTitle} ({movieDetails.movieReleaseYear}) <br />
                            </div>
                                <LazyLoad height={197}>
                                    <img className="thumbnail" src={imgSrc} width="140" height="197" />
                                </LazyLoad>
                            <div className="metadataDrawerDialogueContainer">
                                {movieDetails.runtimeInMinutes} minutes <br /> <br />
                                Line {this.props.screenshotDetails.movieLineNumber}: <br />
                                "{this.props.screenshotDetails.movieLineText}" <br />
                            </div>
                            <Paper>
                                <div className="metadataDrawerTimelineContainer">
                                    <svg height="70" width="200">
                                        <line x1="10" y1="50" x2="210" y2="50" stroke={"grey"} strokeWidth={1} />
                                        <line x1={MetadataDrawer.timeStampToMinutes(this.props.screenshotDetails.movieStartTimeStamp, this.props.movieDetails.runtimeInMinutes)} y1="30" x2={MetadataDrawer.timeStampToMinutes(this.props.screenshotDetails.movieStartTimeStamp, this.props.movieDetails.runtimeInMinutes)} y2="65" stroke={"gray"} strokeWidth={1}/>
                                    </svg>
                                    {MetadataDrawer.beautifyTimeStamp(this.props.screenshotDetails.movieStartTimeStamp)}
                                </div>
                            </Paper>
                        </div>
                    )
                }
            </Drawer>
        )
    }
}

const getHoverMovieOclcId = (state) => state.hoverMovieOclcId;

const getHoverMovieLineNumber = (state) => state.hoverMovieLineNumber;

const getSearchResponse = (state) => state.search && state.search.response;

const getMovieDetails = createSelector(
    [getHoverMovieOclcId, getSearchResponse],
    (hoverMovieOclcId, searchResponse) => {
        // return film if screenshot is being hovered
        return hoverMovieOclcId && searchResponse ?
            {...searchResponse.find((x) => x.movieOclcId == hoverMovieOclcId)} : null;
    }
);

const getScreenshotDetails = createSelector(
    [getHoverMovieLineNumber, getMovieDetails],
    (hoverMovieLineNumber, movieDetails) => {
        return hoverMovieLineNumber && movieDetails ?
            movieDetails.results.find((x) => x.movieLineNumber == hoverMovieLineNumber) : null;
    }
);

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        movieDetails: getMovieDetails(state),
        screenshotDetails: getScreenshotDetails(state)
    }
}
