import * as React from "react";
import {DEBUG_MODE} from "../../app";

import {Link} from "react-router";

export class ScreenshotWithCaption extends React.Component<any, {}> {
    constructor(props: ScreenshotWithCaptionI) {
        super(props);
    }

    render() {
        var movieOclcId = this.props.screenshotsWithCaptions.movieOclcId;

        return (
            <div>
                {this.props.screenshotsWithCaptions.results.map((object: any) =>
                    {
                        if (!this.props.fromContext) {
                            return (
                                <Link to={"/context/" + movieOclcId + "/" + object.movieLineNumber}  className="list-group-item">
                                    <img className='thumbnail' style={{margin: "auto"}} src={DEBUG_MODE ? "/static/imageFiles/720x480.jpg" : "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + movieOclcId + "/" + object.movieLineNumber + ".png"} width='720' height='480' />
                                    <p className="list-group-item-text">Line #{ object.movieLineNumber }</p>
                                    <p className="list-group-item-text">From { object.movieStartTimeStamp } to { object.movieEndTimeStamp }</p>
                                    <p className="list-group-item-text"> { object.movieLineText } </p>
                                </Link>
                            )
                        }
                        else {
                            return (
                                <a className="list-group-item">
                                    <img className='thumbnail' style={{margin: "auto"}} src={DEBUG_MODE ? "/static/imageFiles/720x480.jpg" : "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + movieOclcId + "/" + object.movieLineNumber + ".png"} width='720' height='480' />
                                    <p className="list-group-item-text">Line #{ object.movieLineNumber }</p>
                                    <p className="list-group-item-text">From { object.movieStartTimeStamp } to { object.movieEndTimeStamp }</p>
                                    <p className="list-group-item-text"> { object.movieLineText } </p>
                                </a>
                            )
                        }

                    }
                )}
            </div>
        )
    }
}