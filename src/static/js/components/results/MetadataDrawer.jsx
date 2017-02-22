import * as React from "react";
import Drawer from 'material-ui/Drawer';
import {connect} from 'react-redux';
import Roboto from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper'

import {DEBUG_MODE} from "../../app.jsx";

import LazyLoad from 'react-lazyload';
import CircularProgress from 'material-ui/CircularProgress';
import {black} from "material-ui/styles/colors";

const timeLineLength = 200;

class MetadataDrawer extends React.Component {

    static timeStampToMinutes(movieStartTimeStamp, totalMovieRuntime) {
        const splitString = movieStartTimeStamp.split(":");
        return Math.ceil((10 + parseInt(splitString[0]) * 60 + parseInt(splitString[1]))/totalMovieRuntime*timeLineLength);
    }

    /* Removes the junk after the comma in the screenshot's timestamp */
    static beautifyTimeStamp(movieStartTimeStamp) {
        const splitString = movieStartTimeStamp.split(",");
        return (splitString[0]);
    }

    render() {

        let imgSrc = this.props.movieDetails != null ? "http://www.filmtvsearch.net/static/imageFiles/" + this.props.movieDetails.movieOclcId + ".gif" : null;
        
        return (
            <Drawer docked={true} open={true} openSecondary={true} zDepth={2} containerStyle={{height: 'calc(100% - 56px)', top: 56}}>
                {this.props.movieDetails == null ? (
                        <div>Metadata <br /></div>
                    ) : (
                        <div>
                            <div className="movieTitleInMetadataDrawer">
                                <Roboto>
                                    {this.props.movieDetails.movieTitle} ({this.props.movieDetails.movieReleaseYear}) <br />
                                </Roboto>
                            </div>
                                <LazyLoad height={197} placeholder={<CircularProgress />}>
                                    <img className="thumbnail" src={imgSrc} width="140" height="197" />
                                </LazyLoad>
                        </div>
                    )
                }

                {this.props.screenshotDetails != null ? (
                    <div>
                        <div className="metadataDrawerDialogueContainer">
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
                    ): null
                }
            </Drawer>
        )
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    if (state.hoverMovieOclcId) {
        let movieDetails = {...state.search.response.find((x) => x.movieOclcId == state.hoverMovieOclcId)};
        let screenshotDetails = movieDetails.results.find((x) => x.movieLineNumber == state.hoverMovieLineNumber);
        delete movieDetails["results"];
        return {
            movieDetails: movieDetails,
            screenshotDetails: screenshotDetails
        }
    }
    else if (state.currentMovieOclcId) {
        let movieDetails = {...state.search.response.find((x) => x.movieOclcId == state.currentMovieOclcId)};
        delete movieDetails["results"];
        return {
            movieDetails: movieDetails,
            screenshotDetails: null
        }
    }
    else {
        return {
            movieDetails: null,
            screenshotDetails: null
        }
    }
}

export const ConnectedMetadataDrawer= connect(
    mapStateToProps
)(MetadataDrawer);