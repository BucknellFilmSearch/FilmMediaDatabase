import * as React from "react";

// import { FilmMetadata } from "./FilmMetadata";
import { ConnectedScreenshotWithCaption } from "./ScreenshotWithCaption.jsx";
// import { Link } from "react-router";
import {GridList} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Waypoint from 'react-waypoint';
import {connect} from 'react-redux'



export class IndividualFilmResults extends React.Component {

    getScreenshotsWithCaption() {
        return this.props.individualFilm.results.map((object) => {
            return (
                <ConnectedScreenshotWithCaption
                key={`screenshot${this.props.individualFilm.movieTitle}linenumber${object.movieLineNumber}`}
                screenshotDetails={object} movieOclcId={this.props.individualFilm.movieOclcId}/>
            );
        });
    }

    render() {
        // TODO - make this responsive using http://broucz.github.io/react-inline-grid/
        return (
            <div className="screenshotsGridList">
                <Subheader>{`${this.props.individualFilm.movieTitle} (${this.props.individualFilm.movieReleaseYear})`}</Subheader>
                <GridList cellHeight={180} cols={4}>
                    { this.getScreenshotsWithCaption() }
                </GridList>
                <Waypoint
                    onEnter={() => this.props.onScrollIntoFilm()}
                />
            </div>
        )
    }
}

const scrollIntoFilm = (movieOclcId) => {
    return {
        type: 'SCROLL_INTO_FILM',
        movieOclcId
    }
};

// Map Redux state to component props
function mapStateToProps(state) {
    return {}
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch, filmProps) {
    return {
        onScrollIntoFilm: () => dispatch(scrollIntoFilm(filmProps.individualFilm.movieOclcId))
    }
}

export const ConnectedIndividualFilmResults = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualFilmResults);