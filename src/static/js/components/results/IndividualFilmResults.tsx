import * as React from "react";

import { FilmMetadata } from "./FilmMetadata";
import { ScreenshotWithCaption } from "./ScreenshotWithCaption";


export class IndividualFilmResults extends React.Component<any, {}> {
    render() {
        return (
            <div className="list-group">
                <FilmMetadata metadata={this.props.individualFilm} />
                <ScreenshotWithCaption screenshotsWithCaptions={this.props.individualFilm} />
            </div>
        )
    }
}