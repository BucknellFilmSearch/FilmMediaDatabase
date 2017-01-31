import * as React from "react";

// import { FilmMetadata } from "./FilmMetadata";
import { ConnectedScreenshotWithCaption } from "./ScreenshotWithCaption";
// import { Link } from "react-router";
import {GridList} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';


export class IndividualFilmResults extends React.Component<any, {}> {

    getScreenshotsWithCaption() {
        return this.props.individualFilm.results.map((object: any) => {
            return (
                <ConnectedScreenshotWithCaption
                key={`screenshot${this.props.individualFilm.movieTitle}linenumber${object.movieLineNumber}`}
                screenshotWithCaption={object} movieDetails={this.props.individualFilm}/>
            );
            // let linkKey = `link${this.props.movieOclcId}linenumber${object.movieLineNumber}`;
            // return this.props.fromContext ? (
            //     <a key={linkKey} className="list-group-item">
            //         {screenshotWithCaption}
            //     </a>
            // ) : (
            //     <Link key={linkKey}
            //           to={"/context/" + this.props.individualFilm.movieOclcId + "/" + object.movieLineNumber}
            //         className="list-group-item">
            //         {screenshotWithCaption}
            //     </Link>
            // )
        });
    }

    render() {
        // TODO - make this responsive using http://broucz.github.io/react-inline-grid/
        return (
            <div className="screenshotsGridList">
                <Subheader>{`${this.props.individualFilm.movieTitle} (${this.props.individualFilm.movieReleaseYear})`}</Subheader>
                <GridList cellHeight={180} cols={4}>
                    {/*<FilmMetadata metadata={this.props.individualFilm} />*/}
                    { this.getScreenshotsWithCaption() }
                </GridList>
            </div>
        )
    }
}