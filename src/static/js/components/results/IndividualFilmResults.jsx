import * as React from "react";

import ScreenshotWithCaption from "./ScreenshotWithCaption.jsx";
import {GridList} from 'material-ui/GridList';

export default class IndividualFilmResults extends React.Component {

    getScreenshotsWithCaption() {
        return this.props.individualFilm.results.map(object => (
            <ScreenshotWithCaption
                key={`screenshot${this.props.individualFilm.movieTitle}linenumber${object.movieLineNumber}`}
                screenshotDetails={object} movieOclcId={this.props.individualFilm.movieOclcId}/>
            )
        );
    }

    render() {
        return (
            <div className="screenshotsGridList" name={this.props.individualFilm.movieOclcId}>
                <div className="screenshotsMovieTitle">
                    {this.props.individualFilm.movieTitle} ({this.props.individualFilm.movieReleaseYear})
                </div>
                <GridList cellHeight={180} cols={4}>
                    { this.getScreenshotsWithCaption() }
                </GridList>
            </div>
        )
    }
}
