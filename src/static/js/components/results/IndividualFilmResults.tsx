import * as React from "react";

import { DEBUG_MODE } from "../../app";
import { FilmMetadata } from "./FilmMetadata";
import { ScreenshotWithCaption } from "./ScreenshotWithCaption";
import {Link} from "react-router";


export class IndividualFilmResults extends React.Component<any, {}> {
    render() {
        return (
            <div className="list-group">
                <FilmMetadata metadata={this.props.individualFilm} />
                {
                    this.props.individualFilm.results.map((object: any) => {
                        if (!this.props.fromContext) {
                            return (
                                <Link
                                    to={"/context/" + this.props.individualFilm.movieOclcId + "/" + object.movieLineNumber}
                                    className="list-group-item">
                                    <img className='thumbnail' style={{margin: "auto"}}
                                         src={DEBUG_MODE ? "/static/imageFiles/720x480.jpg" : "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + this.props.individualFilm.movieOclcId + "/" + object.movieLineNumber + ".png"}
                                         width='720' height='480'/>
                                    <p className="list-group-item-text">Line #{ object.movieLineNumber }</p>
                                    <p className="list-group-item-text">From { object.movieStartTimeStamp }
                                        to { object.movieEndTimeStamp }</p>
                                    <p className="list-group-item-text"> { object.movieLineText } </p>
                                </Link>
                            );
                        }
                        else {
                            return (
                                <a className="list-group-item">
                                    <img className='thumbnail' style={{margin: "auto"}}
                                         src={DEBUG_MODE ? "/static/imageFiles/720x480.jpg" : "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + this.props.individualFilm.movieOclcId + "/" + object.movieLineNumber + ".png"}
                                         width='720' height='480'/>
                                    <p className="list-group-item-text">Line #{ object.movieLineNumber }</p>
                                    <p className="list-group-item-text">From { object.movieStartTimeStamp }
                                        to { object.movieEndTimeStamp }</p>
                                    <p className="list-group-item-text"> { object.movieLineText } </p>
                                </a>
                            );
                        }
                    })
                }
                {/*<ScreenshotWithCaption screenshotsWithCaptions={this.props.individualFilm} />*/}
            </div>
        )
    }
}