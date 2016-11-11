import * as React from "react";

import { FilmMetadata } from "./FilmMetadata";
import { ScreenshotWithCaption } from "./ScreenshotWithCaption";
import { Link } from "react-router";


export class IndividualFilmResults extends React.Component<any, {}> {

    getScreenshotsWithCaption() {
        return this.props.individualFilm.results.map((object: any) => {
            var screenshotWithCaption = <ScreenshotWithCaption screenshotWithCaption={object} movieOclcId={object} />;
            return this.props.fromContext ? (
                <a className="list-group-item">
                    {screenshotWithCaption}
                </a>
            ) : (
                <Link
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