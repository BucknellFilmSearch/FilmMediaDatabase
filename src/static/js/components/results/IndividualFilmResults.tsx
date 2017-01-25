import * as React from "react";

import { FilmMetadata } from "./FilmMetadata";
import { ScreenshotWithCaption } from "./ScreenshotWithCaption";
import { Link } from "react-router";


export class IndividualFilmResults extends React.Component<any, {}> {

    getScreenshotsWithCaption() {
        return this.props.individualFilm.results.map((object: any) => {
            var screenshotWithCaption = <ScreenshotWithCaption
                key={`screenshot${this.props.movieOclcId}linenumber${object.movieLineNumber}`}
                screenshotWithCaption={object} movieOclcId={object}
            />;
            let linkKey = `link${this.props.movieOclcId}linenumber${object.movieLineNumber}`;
            return this.props.fromContext ? (
                <a key={linkKey} className="list-group-item">
                    {screenshotWithCaption}
                </a>
            ) : (
                <Link key={linkKey}
                      to={"/context/" + this.props.individualFilm.movieOclcId + "/" + object.movieLineNumber}
                    className="list-group-item">
                    {screenshotWithCaption}
                </Link>
            )
        });
    }

    render() {
        return (
            <div className="list-group">
                <FilmMetadata metadata={this.props.individualFilm} />
                { this.getScreenshotsWithCaption() }
            </div>
        )
    }
}