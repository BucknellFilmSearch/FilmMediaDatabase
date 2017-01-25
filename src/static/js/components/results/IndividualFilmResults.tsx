import * as React from "react";

import { FilmMetadata } from "./FilmMetadata";
import { ScreenshotWithCaption } from "./ScreenshotWithCaption";
import { Link } from "react-router";
import {GridList} from 'material-ui/GridList';


export class IndividualFilmResults extends React.Component<any, {}> {

    getScreenshotsWithCaption() {
        return this.props.individualFilm.results.map((object: any) => {
            return (
                <ScreenshotWithCaption
                key={`screenshot${this.props.movieOclcId}linenumber${object.movieLineNumber}`}
                screenshotWithCaption={object} movieOclcId={object}
            />);
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
        return (
            <GridList cellHeight={180}>
                {/*<FilmMetadata metadata={this.props.individualFilm} />*/}
                { this.getScreenshotsWithCaption() }
            </GridList>
        )
    }
}